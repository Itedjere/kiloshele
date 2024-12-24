import { useEffect, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

// Import the editor styles
import "@pqina/pintura/pintura.css";
import { openDefaultEditor } from "@pqina/pintura";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import {
  FileDropzoneProps,
  UFileInterface,
} from "../../../utitlities/typesUtils";
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  img,
  thumbIcon,
  rejectStyle,
  thumb,
  thumbButtonDelete,
  thumbButtonEdit,
  thumbInner,
  thumbsContainer,
} from "./FileDropzoneCSS";
import ButtonLoading from "../LoadingSkeletons/ButtonLoading";
import { FaFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { getFileType } from "../../../utitlities/utils";

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

export default function FileDropzone({
  serverFiles = [],
  handleDeleteFile,
  isDeletingFile = false,
  files,
  setFiles,
  accept,
  maxFiles,
}: FileDropzoneProps) {
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
    if (acceptedFiles.length + files.length > maxFiles) {
      return toast.error(`You can only upload ${maxFiles} files`);
    }

    // Filter out duplicate files based on name and size
    const existingFileNames = new Set(
      files.map((file) => `${file.name}-${file.size}`)
    );

    const newlyUploadedFiles = acceptedFiles
      .filter((file) => !existingFileNames.has(`${file.name}-${file.size}`)) // Exclude duplicates
      .map((file) => {
        const isImage = file.type.startsWith("image/");
        return Object.assign(file, {
          preview: isImage ? URL.createObjectURL(file) : null, // Preview for images
        });
      });

    // Check if any duplicates were found
    if (newlyUploadedFiles.length < acceptedFiles.length) {
      toast.warn("Some files were already uploaded and skipped.");
    }

    setFiles((files) => [...files, ...newlyUploadedFiles]);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const tooManyFiles = fileRejections.some((rejection) =>
      rejection.errors.some((error) => error.code === "too-many-files")
    );

    if (tooManyFiles) {
      toast.error(`You can only upload up to ${maxFiles} files.`);
    }
  };

  const onDeleteFile = (fileUrl: string) => {
    if (handleDeleteFile) {
      handleDeleteFile(fileUrl);
    } else {
      console.warn("handleDeleteFile is not defined");
    }
  };

  const handleRemovePreview = (fileToRemove: UFileInterface) => {
    setFiles(files.filter((file) => file.name !== fileToRemove.name));
  };

  const renderPickedFiles = (file: UFileInterface, index: number) => {
    if (file.preview) {
      return (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={file.preview} style={img} alt="" />
          </div>
          <button
            style={thumbButtonEdit}
            type="button"
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
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemovePreview(file)}
          >
            <FaTrash className="me-1" />
            Delete
          </button>
        </div>
      );
    } else if (file.type === "application/pdf") {
      return (
        <div style={thumb} key={file.name}>
          <div
            style={thumbIcon}
            className="d-flex justify-content-center align-items-center w-100 h-100 text-danger"
          >
            <FaFilePdf />
          </div>
          <button
            style={thumbButtonDelete}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemovePreview(file)}
          >
            <FaTrash className="me-1" />
            Delete
          </button>
        </div>
      );
    } else if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <div style={thumb} key={file.name}>
          <div
            style={thumbIcon}
            className="d-flex justify-content-center align-items-center w-100 h-100 text-success"
          >
            <RiFileExcel2Fill />
          </div>
          <button
            style={thumbButtonDelete}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemovePreview(file)}
          >
            <FaTrash className="me-1" />
            Delete
          </button>
        </div>
      );
    }
  };

  const renderFormerlyPickedFiles = (fileUrl: string) => {
    // Check file type first
    const fileType = getFileType(fileUrl);
    if (fileType === "image") {
      return (
        <div style={thumb} key={fileUrl}>
          <div style={thumbInner}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${fileUrl}`}
              style={img}
              alt=""
            />
          </div>
          <button
            style={thumbButtonEdit}
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={isDeletingFile}
          >
            <MdEdit className="me-1" />
            Edit
          </button>
          <button
            style={thumbButtonDelete}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteFile(fileUrl)}
            disabled={isDeletingFile}
          >
            {isDeletingFile ? (
              <ButtonLoading message="Deleting" />
            ) : (
              <>
                <FaTrash className="me-1" />
                Delete
              </>
            )}
          </button>
        </div>
      );
    } else if (fileType === "pdf") {
      return (
        <div style={thumb} key={fileUrl}>
          <div
            style={thumbIcon}
            className="d-flex justify-content-center align-items-center w-100 h-100 text-danger"
          >
            <FaFilePdf />
          </div>
          <button
            style={thumbButtonDelete}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteFile(fileUrl)}
            disabled={isDeletingFile}
          >
            {isDeletingFile ? (
              <ButtonLoading message="Deleting" />
            ) : (
              <>
                <FaTrash className="me-1" />
                Delete
              </>
            )}
          </button>
        </div>
      );
    } else if (fileType === "excel") {
      return (
        <div style={thumb} key={fileUrl}>
          <div
            style={thumbIcon}
            className="d-flex justify-content-center align-items-center w-100 h-100 text-success"
          >
            <RiFileExcel2Fill />
          </div>
          <button
            style={thumbButtonDelete}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteFile(fileUrl)}
            disabled={isDeletingFile}
          >
            {isDeletingFile ? (
              <ButtonLoading message="Deleting" />
            ) : (
              <>
                <FaTrash className="me-1" />
                Delete
              </>
            )}
          </button>
        </div>
      );
    }
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept,
      maxFiles,
      onDrop,
      onDropRejected, // Handle rejected files
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
      {files.length + serverFiles.length < 3 && (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p className="mb-0">
            Drag 'n' drop up to 3 files here, or click to select files
          </p>
        </div>
      )}
      <aside style={thumbsContainer}>
        {serverFiles.map((fileUrl) => renderFormerlyPickedFiles(fileUrl))}
        {files.map((file, index) => renderPickedFiles(file, index))}
      </aside>
    </>
  );
}
