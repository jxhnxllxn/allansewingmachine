import React, { useEffect } from 'react';

import Dropzone from 'react-dropzone';
import axios from 'axios';

import Loading from '../components/loading';
import { useState } from 'react';

const FileUpload = (props) => {
    const [state, setState] = useState({
        uploadedFiles: [],
        uploading: false
    })

    const onDrop = (files) => {
        setState({
            ...state,
            uploading: true,
        })
        const formData = new FormData();
        formData.append("file", files[0]);
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post('/api/auth/uploadimage', formData, config)
            .then(res => {
                setState({
                    ...state,
                    uploading: false,
                    uploadedFiles: [
                        ...state.uploadedFiles,
                        res.data
                    ]
                });
                if (state.uploading === false && state.uploadedFiles !== null) {
                    props.imagesHandler(state.uploadedFiles);
                    console.log('works')
                }
            })
    }
    useEffect(() => {
        if (state.uploading === false && state.uploadedFiles !== null) {
            props.imagesHandler(state.uploadedFiles);
        }
    // eslint-disable-next-line
    }, [state.uploadedFiles])

    const onRemove = (id) => {
        const data = {
            public_id: `${id}`
        }
        axios.post('/api/auth/deleteimage', data).then(res => {
            let images = state.uploadedFiles.filter(item => {
                return item.public_id !== id;
            })

            setState({
                ...state,
                uploadedFiles: images
            })


        })
    }

    const showUploadedImages = () => (
        state.uploadedFiles.map(item => (
            <div
                key={item.public_id}
                onClick={() => onRemove(item.public_id)}
                className="images_to_show"
                style={{
                    backgroundImage: `url(${item.url})`,
                    backgroundSize: 'cover',
                    height: '300px',
                    width: '240px',

                }}
            >
            </div>
        ))
    )
    useEffect(() => {
        if (props.reset) {
            setState({
                uploadedFiles: []
            })
        } else {
            console.log(props)
        }
    // eslint-disable-next-line
    }, [props.reset])

    return (
        <div>
            <Dropzone
                onDrop={(e) => onDrop(e)}
                multiple={false}
                className="dropzone_box"
            >
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone_box container">
                        <div
                            {...getRootProps({
                                className: 'dropzone',
                                onDrop: event => event.stopPropagation()
                            })}
                        >
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop your image, or click to select files</p>
                        </div>
                    </div>

                )}
            </Dropzone>

            <div className="show_upload_image">
                {showUploadedImages()}
            </div>

            {
                state.uploading ?
                    <div style={{
                        textAlign: 'center',
                        paddingTop: '60px',
                        display: 'block'
                    }}>
                        <Loading />
                    </div>
                    : null
            }
        </div>
    );
}

export default FileUpload