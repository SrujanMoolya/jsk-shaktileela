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
    toast.loading('Starting process...', { id: 'upload-progress' });
    
    try {
      console.log('File metadata:', { name: file.name, type: file.type, size: file.size });
      toast.loading('Compressing massive photo...', { id: 'upload-progress' });

      // 1. Advanced Compression (Prevents iPhone 48MP Canvas Memory Crash)
      const options = {
        maxSizeMB: 0.8, 
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.8
      };

      let fileToUpload: File | Blob = file;
      try {
        fileToUpload = await imageCompression(file, options);
        console.log('Compression success:', (fileToUpload.size / 1024).toFixed(2), 'KB');
      } catch (err: any) {
        console.error('Compression failed:', err);
        throw new Error(`Failed to optimize: ${err.message}`);
      }

      // 2. Opera Shield / Network Bypass (Masking Blob as Native File)
      const ext = fileToUpload.type === 'image/png' ? 'png' : 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      
      const finalFile = new File([fileToUpload], fileName, {
        type: fileToUpload.type || 'image/jpeg',
        lastModified: Date.now()
      });

      const fullPath = `${folder}/${fileName}`;

      toast.loading('Transferring optimized photo...', { id: 'upload-progress' });
      
      // 3. Upload exactly as a native file
      const uploadPromise = supabase.storage
        .from('media')
        .upload(fullPath, finalFile, {
          contentType: fileToUpload.type || 'image/jpeg',
          upsert: true
        });

      // 4. Very generous timeout incase connection slows down
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Cloud upload timed out after 3 minutes.')), 180000)
      );

      const { error, data } = await Promise.race([uploadPromise, timeoutPromise]) as any;
      
      if (error) throw error;

      console.log('Upload success! Data:', data);

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fullPath);
      console.log('Public URL:', publicUrl);
      
      onUpload(publicUrl);
      toast.success('Successfully uploaded', { id: 'upload-progress' });
    } catch (err: any) {
      console.error('Upload Process Exception:', err);
      toast.error(`Upload Error: ${err.message || 'Unknown error'}`, { id: 'upload-progress' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      console.log('--- Upload Diagnostic End ---');
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
