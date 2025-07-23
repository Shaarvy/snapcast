"use client"
import FormField from "@/components/FormField";
import FileInput from "@/components/FileInput";
import { ChangeEvent, useState } from "react";


const Page = () => {
  const [error, seterror] = useState(null);
  return (
    <div className="wrapper-md upload-page">
        <h1>Upload a video</h1>
        {error && <div className="error-field">{error}</div>}
        <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5">
             <FormField id={""} label={""} value={""} onChange={function (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
                  throw new Error("Function not implemented.");
              } } />
             <FileInput />
        </form>
    </div>
  )
}

export default Page