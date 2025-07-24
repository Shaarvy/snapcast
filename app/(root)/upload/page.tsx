"use client"
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { ChangeEvent, useState } from "react";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { MAX_VIDEO_SIZE, MAX_THUMBNAIL_SIZE } from "@/constants";


const Page = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public'
  });

  const [error, seterror] = useState(null);

  const video = useFileInput(MAX_VIDEO_SIZE);

  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  };

  return (
    <div className="wrapper-md upload-page">
        <h1>Upload a video</h1>
        {error && <div className="error-field">{error}</div>}
        <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
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
        </form>
    </div>
  )
}

export default Page