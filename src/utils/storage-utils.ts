import { supabase } from "@/integrations/supabase/client";

/**
 * Extracts the storage path from a Supabase public URL
 * @param url The full public URL from Supabase Storage
 * @returns The relative path to the file within the bucket, or null if not a standard storage URL
 */
export const getStoragePathFromUrl = (url: string): string | null => {
  if (!url || !url.includes('/storage/v1/object/public/media/')) return null;
  // Standard format: https://[id].supabase.co/storage/v1/object/public/media/folder/file.jpg
  const parts = url.split('/media/');
  return parts.length > 1 ? parts[1] : null;
};

/**
 * Deletes a file from the 'media' bucket if a URL is provided
 * @param url The full public URL of the file to delete
 */
export const deleteFileFromStorage = async (url: string | null | undefined) => {
  if (!url) return;
  
  const path = getStoragePathFromUrl(url);
  if (!path) return;

  try {
    console.log('Deleting file from storage:', path);
    const { error } = await supabase.storage.from('media').remove([path]);
    if (error) {
      console.error('Error deleting from storage:', error);
    } else {
      console.log('Successfully deleted file from storage');
    }
  } catch (err) {
    console.error('Storage deletion exception:', err);
  }
};
