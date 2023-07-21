import {useState, useEffect} from "react";
// import {createComment, getComments,updateComment} from "../features/lfg/CommentService";
import {createLFGComment, getLFGComments, updateLFGComment, deleteLFGComment} from "../features/lfg/CommentSlice";
import { useDispatch } from "react-redux";
import Comment from "../components/LFGComment";
import CommentForm from "../components/LFGCommentForm";
import "../styles/LFGComment.css"
// import { set } from "mongoose";

const LFGComments = ({post_id, user_id, userName}) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    // sorting? reverse ? 15:30 ish?
    const getReplies = (commentid) => {
        return backendComments.filter(backendComments=>backendComments.parent_comment_id === commentid).sort(
            (a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }

    const rootComments = Object.values(backendComments).filter(backendComments => backendComments.parent_comment_id === "null");

    const dispatch = useDispatch();

    const addComment = (text, id) => {
        var parent_comment_id
        if (id){
            parent_comment_id = id;
        }
        else{
            parent_comment_id = "null";
        }
        const date = new Date();
        var data = dispatch(createLFGComment({user_id, userName, post_id, parent_comment_id, text})
        // .then(comment => {
        //     setBackendComments([comment, ...backendComments]);
        // })
        );
        data.arg.Date = date;
        setBackendComments([...backendComments, data.arg]);
        setActiveComment(null);
    }

    const deleteComment = (comment_id) => {
        if(window.confirm("Are you sure you want to remove this comment?")){
            var data = dispatch(deleteLFGComment({post_id, comment_id})
            // .then(() => {
            //     console.log("testing??");})
            );
            const updatedDeleteComments = backendComments.filter((backendComment) =>
                backendComment._id !== data.arg.comment_id
            );
            setBackendComments(updatedDeleteComments);
        }
    }

    const updateComment = (text, comment_id, post_id) => {
        const data = dispatch(updateLFGComment({text, comment_id, post_id}));
        const updatedDeleteComments = backendComments.map((backendComment) =>{
            if (backendComment._id === comment_id){
                return {...backendComment, text: text}
            }
            return backendComment;
        });
        setBackendComments(updatedDeleteComments);
        setActiveComment(null);
    }

    useEffect(() => {
        dispatch(getLFGComments(post_id))
        .then((data)=>{
            setBackendComments(data.payload);
        });
    }, [])

    return (
        <div className="comments">
            <h1 className="comments-title">Comments</h1>
            
            <div className="comments-containter">
                {rootComments.map(rootComment=>(
                <Comment 
                comment={rootComment} 
                replies ={getReplies(rootComment._id)} 
                getReplies={getReplies}
                user_id={user_id} 
                key={rootComment._id} 
                deleteComment={deleteComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                updateComment={updateComment}
                />))}
            </div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}
            />
        </div>
    );
};
export default LFGComments;