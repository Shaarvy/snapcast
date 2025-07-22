"use client"
import {useState} from "react";
import Image from "next/image";

const DropdownList = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
        <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="filter-trigger">
                <figure>
                    <Image src="/assets/icons/hamburger.svg" alt="menu" width={14} height={14} />
                </figure>
            </div>
        </div>
    </div>
  )
}

export default DropdownList