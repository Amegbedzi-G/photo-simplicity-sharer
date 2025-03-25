
-- Create a bucket for storing post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('posts', 'posts', true);

-- Allow public access to post images
CREATE POLICY "Post images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'posts');

-- Allow authenticated users to upload images to their own folder
CREATE POLICY "Users can upload to their own folder"
ON storage.objects FOR INSERT
WITH CHECK (
  auth.uid() = (storage.foldername(name))[1]::uuid
  AND bucket_id = 'posts'
);

-- Allow users to update their own images
CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
USING (
  auth.uid() = (storage.foldername(name))[1]::uuid
  AND bucket_id = 'posts'
);

-- Allow users to delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
USING (
  auth.uid() = (storage.foldername(name))[1]::uuid
  AND bucket_id = 'posts'
);
