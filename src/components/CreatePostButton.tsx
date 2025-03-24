
import React, { useState } from "react";
import { Plus, Image, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostButtonProps {
  onPostCreated: (post: any) => void;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const clearImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !user) return;

    setIsSubmitting(true);
    try {
      // In a real app, we would upload the file to a storage service
      // For now, we'll just create a mock post with the object URL
      
      // Convert file to base64 for demo purposes
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const base64Image = reader.result as string;
        
        const newPost = {
          id: crypto.randomUUID(),
          userId: user.id,
          username: user.username,
          profilePicture: user.profilePicture,
          imageUrl: base64Image,
          caption: caption.trim() || undefined,
          createdAt: new Date().toISOString(),
        };
        
        onPostCreated(newPost);
        
        toast({
          title: "Post created",
          description: "Your photo has been shared successfully",
        });
        
        setOpen(false);
        setCaption("");
        clearImage();
      };
    } catch (error) {
      toast({
        title: "Failed to create post",
        description: "There was an error uploading your photo",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg fixed right-6 bottom-6 z-10"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Create post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Share a photo</DialogTitle>
            <DialogDescription>
              Upload an image to share with your followers
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {previewUrl ? (
              <div className="relative aspect-square">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center border-2 border-dashed rounded-md p-8 h-64">
                <Label
                  htmlFor="picture"
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  <Image className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Click to upload an image
                  </span>
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (optional)</Label>
              <Textarea
                id="caption"
                placeholder="Add a caption to your photo..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!imageFile || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
