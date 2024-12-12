import { useEffect, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

// Import the editor styles
import "@pqina/pintura/pintura.css";
import { openDefaultEditor } from "@pqina/pintura";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { UFileInterface } from "../../../utitlities/typesUtils";
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  img,
  rejectStyle,
  thumb,
  thumbButtonDelete,
  thumbButtonEdit,
  thumbInner,
  thumbsContainer,
} from "./FileDropzoneCSS";

// This function is called when the user taps the edit button.
// It opens the editor and returns the modified file when done
const editImage = (
  image: UFileInterface,
  done: (output: UFileInterface) => void
) => {
  const imageFile = image.pintura ? image.pintura.file : image;
  const imageState = image.pintura ? image.pintura.data : {};

  const editor = openDefaultEditor({
    src: imageFile,
    imageState,
  });

  editor.on("close", () => {
    // the user cancelled editing the image
  });

  editor.on("process", ({ dest, imageState }) => {
    Object.assign(dest, {
      pintura: { file: imageFile, data: imageState },
    });
    done(dest);
  });
};

interface FileDropzoneProps {
  files: UFileInterface[];
  setFiles: React.Dispatch<React.SetStateAction<UFileInterface[]>>;
}

export default function FileDropzone({ files, setFiles }: FileDropzoneProps) {
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
  }, [files]);

  const onDrop = (acceptedFiles: UFileInterface[]) => {
    if (acceptedFiles.length + files.length > 3) {
      return toast.error("You can only upload 3 files");
    }

    const newlyUploadedFiles = acceptedFiles.map((file) => {
      const isImage = file.type.startsWith("image/");
      return Object.assign(file, {
        preview: isImage ? URL.createObjectURL(file) : null, // Preview for images
      });
    });
    setFiles((files) => [...files, ...newlyUploadedFiles]);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const tooManyFiles = fileRejections.some((rejection) =>
      rejection.errors.some((error) => error.code === "too-many-files")
    );

    if (tooManyFiles) {
      toast.error("You can only upload up to 3 files.");
    }
  };

  const handleRemovePreview = (fileToRemove: UFileInterface) => {
    setFiles(files.filter((file) => file.name !== fileToRemove.name));
  };

  const thumbs = files.map((file, index) => {
    if (file.preview) {
      return (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={file.preview} style={img} alt="" />
          </div>
          <button
            style={thumbButtonEdit}
            className="btn btn-secondary btn-sm"
            onClick={() =>
              editImage(file, (output) => {
                const updatedFiles = [...files];

                // replace original image with new image
                updatedFiles[index] = output;

                // revoke preview URL for old image
                if (file.preview) URL.revokeObjectURL(file.preview);

                // set new preview URL
                Object.assign(output, {
                  preview: URL.createObjectURL(output),
                });

                // update view
                setFiles(updatedFiles);
              })
            }
          >
            <MdEdit className="me-1" />
            Edit
          </button>
          <button
            style={thumbButtonDelete}
            className="btn btn-danger btn-sm"
            onClick={() => handleRemovePreview(file)}
          >
            <FaTrash className="me-1" />
            Delete
          </button>
        </div>
      );
    }
  });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
        "application/pdf": [],
        "application/vnd.ms-excel": [],
      },
      onDrop,
      onDropRejected, // Handle rejected files
      maxFiles: 3,
    });

  const style: React.CSSProperties = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      {files.length < 3 && (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p className="mb-0">
            Drag 'n' drop up to 3 files here, or click to select files
          </p>
        </div>
      )}
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
}
