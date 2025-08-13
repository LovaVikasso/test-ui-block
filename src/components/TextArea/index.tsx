import type { ComponentProps } from 'react';
import { TextArea as RadixTextArea } from '@radix-ui/themes';
import s from './../Input/Input.module.scss';

interface CustomTextAreaProps
    extends Omit<ComponentProps<typeof RadixTextArea>, 'size' | 'variant'> {
    label?: string;
    error?: string;
    className?: string;
}

export function TextArea({ placeholder, label, ...props }: CustomTextAreaProps) {
    return (
        <div>
            {label && <label className={s.label}>{label}</label>}
            <RadixTextArea size="2" variant="surface" placeholder={placeholder} {...props} className={s.input} />
        </div>
    );
}
