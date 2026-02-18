import React, { FC } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { ButtonAtom, TooltipAtom } from '@atoms';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface IDropZoneAtom {
  onAccept: (files: File[], screen: string) => void;
  onReject: (files: File[]) => void;
  options: DropzoneOptions;
  screen: string;
}

export const DownLoadImage: FC<IDropZoneAtom> = (props) => {
  const { onAccept, onReject, options, screen } = props;

  const { getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length) {
        onAccept(acceptedFiles, screen);
      }
      if (fileRejections.length) {
        onReject(fileRejections.map((f) => f.file));
      }
    },
    ...options,
  });

  return (
    <div>
      <TooltipAtom title={'Загрузить изображение'}>
        <ButtonAtom startIcon={<UploadFileIcon />} theme={'Secondary'} onClick={open} />
      </TooltipAtom>
      <input {...getInputProps()} />
    </div>
  );
};
