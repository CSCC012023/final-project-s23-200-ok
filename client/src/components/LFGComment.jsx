import CommentForm from "./LFGCommentForm";
// import updateComment from "../features/lfg/CommentSlice";

const LFGComment = ({comment, replies, user_id, deleteComment, activeComment, setActiveComment, addComment, updateComment, getReplies}) => {
    const canReply = Boolean(user_id);
    const canChange = user_id === comment.user_id;
    const isReplying = activeComment && activeComment.type === "replying" && comment._id === activeComment.id;
    const isEditing = activeComment && activeComment.type === "editing" && comment._id === activeComment.id;
    // date format? no hour? only day?
    var betterDate;
    if (comment.hasOwnProperty("Date")){
        betterDate = new Date(comment.Date).toLocaleDateString();
    }
    else{
        betterDate = new Date(comment.date).toLocaleDateString();
    }
    
    return (
        <div className="comment">
            <div className="comment-image-container">
                {/* put profile image here? */}
                <img scr=""/>
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.userName}</div>
                    <div>
                        Created at {betterDate}
                    </div>
                </div>
                {!isEditing && <div className="comment-text">{comment.text}</div>}
                {isEditing && (
                    <CommentForm 
                    submitLabel="Update" 
                    hasCancelButton 
                    initialText={comment.text} 
                    handleSubmit={(text)=>updateComment(text, comment._id, comment.post_id)} 
                    handleCancel={()=>setActiveComment(null)}
                    />
                )}
                <div className="comment-actions">
                    {canReply && <div className="comment-action" onClick={()=>
                    setActiveComment({id: comment._id, type: "replying"})}>Reply</div>}
                    {canChange && <div className="comment-action"
                    onClick={()=>setActiveComment({id: comment._id, type: "editing"})}>Edit</div>}
                    {canChange && (<div className="comment-action" onClick={()=> deleteComment(comment._id)}>Delete</div>)}
                </div>
                {isReplying && (
                    <CommentForm submitLabel="Reply" handleSubmit={(text)=>addComment(text,activeComment.id)}/>
                )}
                {replies.length > 0 && (
                    <div className="replies">{replies.map(reply => (
                        // comment is not nested?
                        <LFGComment 
                        comment={reply} 
                        replies={getReplies(reply._id)}
                        getReplies={getReplies} 
                        user_id={user_id} 
                        key={reply._id} 
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        updateComment={updateComment}
                        />))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default LFGComment;