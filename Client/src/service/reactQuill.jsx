
const modules = {
    toolbar: [
        [{ 'font': [] }], // Font family dropdown
        [{ 'size': ['small', false, 'large', 'huge'] }], // Font size dropdown
        ['bold', 'italic', 'underline', 'strike'], // Inline text styles
        [{ 'color': [] }, { 'background': [] }], // Text and background color
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List styles
        [{ 'align': [] }], // Text alignment
        ['link'], // Media links and images
        ['clean'], // Remove formatting button
       
    ]
}
const formats = [
    'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'align',
    'link',
]; 'link', 'image'

const modules2={
    toolbar: [
        [{ 'font': [] }], // Font family dropdown
        [{ 'size': ['small', false, 'large', 'huge'] }], // Font size dropdown
        ['bold', 'italic', 'underline', 'strike'], // Inline text styles
        [{ 'color': [] }, { 'background': [] }], // Text and background color
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List styles
        [{ 'align': [] }], // Text alignment
        ['link'], // Media links and images
        ['clean'], // Remove formatting button
        
    ],
    keyboard: {
        bindings: {
            // Disable all keyboard events to prevent typing
            handleKeyboard: {
                key: 'any',  // Matches any key
                handler: () => false  // Prevent any key action
            }
        }
    }
}

export default {
    modules,
    formats,
    modules2
}