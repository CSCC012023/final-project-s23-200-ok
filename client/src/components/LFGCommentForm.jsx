import {useState} from "react";

const LFGCommentForm = ({ 
    handleSubmit, 
    submitLabel, 
    hasCancelButton = false, 
    initialText = "", 
    handleCancel
}) => {
    const [text, setText] = useState(initialText);
    const disableSendComment = text.length === 0;
    const onSumbit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }
    return (
        <form onSubmit={onSumbit}>
            <textarea className="comment-form-textarea" value={text} onChange={(e)=>setText(e.target.value)}/>
            <button className="comment-form-button" disabled={disableSendComment}>{submitLabel}</button>
            {hasCancelButton && (
                <button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>Cancel</button>
            )}
        </form>
    );
};
export default LFGCommentForm;