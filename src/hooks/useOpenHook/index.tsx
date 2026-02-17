import React, { FC, useState } from 'react';
import { TUseOpenHook } from './interfaces';

export const useOpenHook: TUseOpenHook = (value = false) => {
    const [isOpen, setIsOpen] = useState(value);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return { isOpen, handleOpen, handleClose };
};
