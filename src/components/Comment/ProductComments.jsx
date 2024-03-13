import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from "date-fns";
import sweetalert from 'sweetalert2';
import * as yup from 'yup';


const ProductComments = ({product}) => {

const user = JSON.parse(Cookies.get('user') || null);
const [comments, setComment] = useState([]);
const [refetch, setRefetch] = useState(true)
const [editForm, setEditForm] = useState(false);
const [commentId, setCommentId] = useState();
const [errors, setErrors] = useState({});
const [error, setError] = useState(null);
const [addFormData, setAddFormData] = useState({
    content: '',
    product_id: product._id,
    user_id: user._id,
});

const fetchData = async () => {
    try {
      if(product._id){
      const response = await axios.get(`http://localhost:3000/api/comment/getComments/${product._id}`);
      setComment(response.data.data);
    }
    } catch (error) {
      console.error(error);
    }
};

const schema = yup.object().shape({
    content: yup.string().required('Comment content is Required'),
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(addFormData, { abortEarly: false });
      const requestData = { ...addFormData };

      axios.post('http://localhost:3000/api/comment/createComment', requestData)
        .then(result => {
          setRefetch(!refetch);
          setAddFormData({
            content: '',
            product_id: product._id,
            user_id: user._id,
          });
        })
        .catch(err => {
          const errorMsg = err.response ? err.response.data.error : 'An error occurred in add comment';
          console.log(errorMsg);
          setError(errorMsg);
        });
    } catch (validationError) {
      const fieldErrors = {};
      validationError.inner.forEach(err => {
        fieldErrors[err.path] = err.message;
      });
      setErrors(fieldErrors);
    }
};

const deleteComment = async (id) => {
const result = await new Promise((resolve) => {
    sweetalert.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7a014a',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
    resolve(result);
    });
});

if (result.isConfirmed) {
    try {
    await axios.delete(`http://localhost:3000/api/comment/deleteComment/${id}`);
    setRefetch(!refetch);
    sweetalert.fire('Deleted!', 'Your Comment has been deleted.', 'success');
    } catch (error) {
    console.log(error);
    }
}
};

const editComment = (item) => {
    setEditForm(true)
    setCommentId(item._id)
    setAddFormData({
      content: item.content,
      product_id: product._id,
      user_id: user._id,
    });
}

const cancelEditComment = (e) => {
    e.preventDefault();
      setEditForm(false)
      setAddFormData({
        content: '',
        product_id: product._id,
        user_id: user._id,
      });
      setCommentId('')
}

async function handleEditSubmit(e, id) {
      e.preventDefault();
      try {
        await schema.validate(addFormData, { abortEarly: false });
        const requestData = { ...addFormData };
  
        axios.post(`http://localhost:3000/api/comment/updateComment/${id}`, requestData)
          .then(result => {
            const msg = result.data.success;
            sweetalert.fire('Success!', `${msg}`, 'success');
            setCommentId('')
            setRefetch(!refetch);
            setAddFormData({
                content: '',
                product_id: product._id,
                user_id: user._id,
            });
            setEditForm(false)
          })
          .catch(err => {
            const errorMsg = err.response ? err.response.data.error : 'An error occurred in update comment';
            console.log(errorMsg);
            setError(errorMsg);
          });
      } catch (validationError) {
        const fieldErrors = {};
        validationError.inner.forEach(err => {
          fieldErrors[err.path] = err.message;
        });
        setErrors(fieldErrors);
      }
};

useEffect(() => {
    fetchData();
}, [refetch]);

  return (
    <div className="container border p-3 rounded-lg">
        <div className=" mb-3">
            <p className="me-2"><b>Comments Section</b> <span className='text-xs text-gray-400'>this product have {comments.length} comments</span></p>
        </div>

        <div id="comentScroll" className="overflow-auto mb-3 p-3 bg-gray-100 rounded-lg" style={{ maxWidth: '100%', maxHeight: '20em' }}>
            {comments.map((comment, index) => {
                if (product._id === comment.product_id) {
                    return (
                        <div key={index} className="incoming_msg mb-4">
                            
                            <pre className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <b>{comment.user_id.name}</b>
                            </pre>

                            <div className="received_msg ms-3" style={{ overflowWrap: 'break-word' }}>

                                {comment._id == commentId ? 
                                <div className={`my-2 ms-4 ${editForm == false ? 'hidden' : ''}`}>
                                    <div className=" rounded-lg">
                                        <form onSubmit={(e) => handleEditSubmit(e, commentId)}>
                                            {errors.content && <div className="text-red-600 text-xs pe-28">{errors.content}</div>}
                                            <div className='flex'>
                                                <input 
                                                value={addFormData.content}
                                                onChange={(e) => setAddFormData({ ...addFormData, content: e.target.value })}
                                                type="text" className='p-1 me-2 rounded border border-gray'/>

                                                <button className="text-green-600 font-medium text-sm me-2 " >
                                                    Save  
                                                </button>

                                                <button onClick={cancelEditComment} className="text-gray-500 font-medium text-sm " >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>: 
                                <div>
                                    <p className="mt-2 ms-4 text-secondary text-wrap">{comment.content}</p>
                                </div>
                                }

                                <div className={`${editForm == false ? '' : 'hidden'}`}>
                                    <span className="text-gray-500 mx-4" style={{ fontSize: '.7em' }}>{formatDistanceToNow(new Date(comment.updated_at), {addSuffix: true,})}</span>
                                    {comment.user_id._id === user._id ? (
                                        <span><button onClick={() => editComment(comment)}><b className="text-green-700" style={{ fontSize: '.7em' }}>edit</b></button> <span><button onClick={() => deleteComment(comment._id)}  className="text-red-700" style={{ fontSize: '.7em' }}><b>delete</b></button></span></span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>

        <hr className="my-3" />
        <div className="container">
            <form className="flex" onSubmit={handleSubmit}>
            <input 
            type="text" 
            className='w-full p-1 me-2 rounded border border-gray' 
            value={editForm ? '' : addFormData.content} 
            onChange={editForm ? undefined : (e) => setAddFormData({ ...addFormData, content: e.target.value }) } 
            placeholder="Your comment" 
            />   

            {editForm ?
            <a className="flex ms-2 px-1 my-[2.5px] rounded bg-black text-white items-center"> Send
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </a>         
            :
            <button className="flex ms-2 px-1 my-[2.5px] rounded bg-black text-white items-center" >
                Send
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>}

            </form>
            {errors.content && <div className="text-red-600 text-xs pe-28 text-start">{errors.content}</div>}
        </div>
    </div>
  )
}

export default ProductComments