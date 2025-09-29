import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { postsAPI } from '../../services/api';
import { postImageUploadService } from '../../services/postServices';

const PostFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  post = null, 
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    content: '',
    category_id: '',
    images: [],
    status: 'published'
  });
  
  const [imagePreview, setImagePreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { categories: apiCategories, loading: categoriesLoading } = useCategories();
  
  // Transform categories for dropdown
  const categories = React.useMemo(() => {
    if (categoriesLoading || !apiCategories.length) {
      return [];
    }
    return apiCategories;
  }, [apiCategories, categoriesLoading]);

  // Pre-fill form when editing
  useEffect(() => {
    if (post && mode === 'edit') {
      setFormData({
        content: post.content || '',
        category_id: post.category_id || '',
        images: post.images || [],
        status: post.status || 'published'
      });
      setImagePreview(post.images || []);
    } else {
      // Reset form for create mode
      setFormData({
        content: '',
        category_id: '',
        images: [],
        status: 'published'
      });
      setImagePreview([]);
    }
  }, [post, mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];
    const previewUrls = [];
    
    setIsSubmitting(true);
    
    try {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          // Create preview URL immediately
          const previewUrl = URL.createObjectURL(file);
          previewUrls.push(previewUrl);
          
          // Upload to BunnyCDN
          const uploadResult = await postImageUploadService.uploadPostImage(file);
          
          if (uploadResult.success) {
            uploadedImages.push({
              image_url: uploadResult.url,
              alt_text: file.name,
              display_order: uploadedImages.length
            });
          } else {
            console.error('Failed to upload image:', uploadResult.error);
            // Remove the preview URL for failed uploads
            previewUrls.pop();
          }
        }
      }
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
      setImagePreview(prev => [...prev, ...previewUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const postData = {
        content: formData.content,
        category_id: parseInt(formData.category_id),
        status: formData.status,
        images: formData.images
      };
      
      let result;
      if (mode === 'edit' && post?.id) {
        result = await postsAPI.update(post.id, postData);
      } else {
        result = await postsAPI.create(postData);
      }
      
      if (result.success) {
        // Call the parent onSubmit with the API response
        await onSubmit(result.data.post);
        onClose();
      } else {
        throw new Error(result.message || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert(`Error: ${error.message || 'Failed to save post'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-primary-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-900">
              {mode === 'edit' ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              onClick={onClose}
              className="text-primary-400 hover:text-primary-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Post Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="What's happening on your farm today?"
              className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              rows={4}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Category *
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Images
            </label>
            <div className="border-2 border-dashed border-primary-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-primary-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <p className="text-xs text-primary-500 mt-1">
                Upload images to showcase your post (optional)
              </p>
            </div>
            
            {/* Image Previews */}
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {imagePreview.map((img, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={img} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-24 object-cover rounded-lg border border-primary-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-primary-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-primary-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.content.trim()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostFormModal;