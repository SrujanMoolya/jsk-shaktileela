import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  folder: string;
}

import imageCompression from 'browser-image-compression';

export default function ImageUpload({ onUpload, folder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Compression options
      const options = {
        maxSizeMB: 0.8, // 800KB target
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      toast.loading('Compressing image...', { id: 'upload-progress' });
      const compressedFile = await imageCompression(file, options);
      
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;

      toast.loading('Uploading to storage...', { id: 'upload-progress' });
      const { error } = await supabase.storage.from('media').upload(fileName, compressedFile);
      
      if (error) {
        toast.error(error.message, { id: 'upload-progress' });
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
      onUpload(publicUrl);
      toast.success('Image uploaded successfully', { id: 'upload-progress' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to process image', { id: 'upload-progress' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </div>
  );
}
