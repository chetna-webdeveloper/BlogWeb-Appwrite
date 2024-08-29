import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full '>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || 'content'}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey='14ublgtv61fl1t3la62ov3k28ra5equskzlm61c4zv3h5zjk'
                        initialValue={defaultValue}
                        init={
                            {
                                initialValue: defaultValue,
                                branding: false,
                                height: 500,
                                menubar: true,
                                plugins:'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                toolbar:
                                    'undo redo | formatselect | bold italic forecolor |\
            alignleft  aligncenter alignright alignjustify|\
            bullist numlist outdent indent | removeformat | help |block|image|',
            content_style:"body{font-family:Helvetica,Arial,sans-serif;font-size:14px}"
                            }
                        }
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE