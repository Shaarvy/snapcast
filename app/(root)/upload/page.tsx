"use client"
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_VIDEO_SIZE, MAX_THUMBNAIL_SIZE } from "@/constants";
import { getVideoUploadUrl, getThumbnailUploadUrl, saveVideoDetails, } from "@/lib/actions/video";

const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> => 
    fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        AccessKey: accessKey,
      },
      body: file,
    }).then((response) => {
      if(!response.ok) throw new Error(`Upload failed with status ${response.status}`);
    });


const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public'
  });

  const [error, setError] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);

  const video = useFileInput(MAX_VIDEO_SIZE);

  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  useEffect(() => {
    if(video.duration !== null) {
      setVideoDuration(video.duration);
    }

  }, [video.duration])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if(!video.file || !thumbnail.file) {
        setError('Please upload video and thumbnail');
        return;
      }
      if(!formData.title || !formData.description) {
        setError('Please fill in all the details');
        return;
      }

      //Upload the video to bunny
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey
      } = await getVideoUploadUrl();

      if(!videoUploadUrl || !videoAccessKey) throw new Error('Failed to get video upload credentials');

      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      //Upload the thumbnail to DB
      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);

      if(!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) throw new Error('Failed to get thumbnail upload credentials');
      await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

      //Create a new DB entry for the video details
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      })
      
    } catch (error) {
      console.log("Error submitting error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="wrapper-md upload-page">
        <h1>Upload a video</h1>
        {error && <div className="error-field">{error}</div>}
        <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit} >
             <FormField 
                id="title"
                label="Title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a clear and concise video title"
             />

             <FormField 
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe what this video is about"
                as="textarea"
             />

             <FileInput 
                id="video"
                label="Video"
                accept="video/*"
                file={video.file}
                previewUrl={video.previewUrl}
                inputRef={video.inputRef}
                onChange={video.handleFileChange}
                onReset={video.resetFile}
                type="video"
             />

              <FileInput
                id="thumbnail"
                label="Thumbnail"
                accept="images/*"
                file={thumbnail.file}
                previewUrl={thumbnail.previewUrl}
                inputRef={thumbnail.inputRef}
                onChange={thumbnail.handleFileChange}
                onReset={thumbnail.resetFile}
                type="image"
             />

             <FormField 
                id="visibility"
                label="Visibility"
                value={formData.visibility}
                options={[
                  {value: 'public', label: 'Public'},
                  {value: 'private', label: 'Private'},
                ]}
                onChange={handleInputChange}
                as="select"
             />

             <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? 'Uploading...' : 'Upload video'}
             </button>
        </form>
    </div>
  )
}

export default Page