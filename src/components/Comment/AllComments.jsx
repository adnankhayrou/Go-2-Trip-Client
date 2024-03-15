import { useEffect, useState } from 'react';
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBar'
import axios from 'axios';
import sweetalert from 'sweetalert2';
import Statistics from '../Dashboard/Statistics';
import { formatDistanceToNow } from "date-fns";


const AllComents = () => {
    const [loading, setLoading] = useState(false);
    const [comments, setComment] = useState([]);
    const [refetch, setRefetch] = useState(true)
    const [addFormData, setAddFormData] = useState({
      Content: '',
    });
    
    const handleSubmit = async (e) => {
      const inputValue = e.target.value;
      setAddFormData({ ...addFormData, Content: inputValue });
  
      if (inputValue.length === 0) {
        fetchData()
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/comment/commentwithContent?content=${inputValue}`);
        setComment(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/comment/getAllComments`);
        // console.log(response.data.data);
        setComment(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    const deleteComment = async (id) => {
      console.log(id);
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
          sweetalert.fire('Deleted!', 'Comment has been deleted.', 'success');
        } catch (error) {
          console.log(error);
        }
      }
    };

    useEffect(() => {
      fetchData();
    }, [refetch]);

  return (
     <>
    <NavBar/>
    <SideBar/>
    <Statistics/>

    {/* add form */}
    <div className={`sm:ml-64 sm:px-14 ps-3 my-2 sm:me-0 me-6`}>
        <div className="rounded-lg"> 
            <div className=" flex justify-end">
              <input
                type='search'
                placeholder="Search" 
                onChange={handleSubmit} 
                value={addFormData.Content}
                className="p-1 rounded border border-gray"
              />
            </div>
        </div>
      </div>
    
        {/* single table */}
      {loading ? (
        <div className="sm:ml-64 pt-2">
      <div className="flex justify-center items-center mt-40 sm:me-40">
        <div className="spinner-border text-yellow-500" role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
        </svg>
        </div>
        <div className="ml-2">Loading...</div>
      </div>
      </div>
      ) : (
        comments == 0 ? (
          <div className="flex justify-center align-items-center" style={{ height: '50vh' }}>
            <p className="fs-3">No Comments!</p>
          </div>
        ) : (
          <>
      
      {/* categories table */}
      <div className="sm:ml-64 sm:px-10 ps-3">
        <div className="overflow-x-auto rounded-lg mb-3 me-3 shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-white dark:text-gray-400">
              <tr>
                <th scope="col" className="text-black px-3 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
                  All Comments
                </th>
              </tr>
              <tr>
            
                <th scope="col" className="ps-6 py-3">
                # {comments.length}
                </th>
                <th scope="col" className="px-6 py-3">
                content
                </th>
                <th scope="col" className="px-6 py-3">
                user name
                </th>
                <th scope="col" className="px-6 py-3">
                Created_at
                </th>

                <th scope="col" className="px-6 py-3">
                updated_at
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
              <tr key={index}  className="odd:bg-white odd:dark:bg-white-200 even:bg-white even:dark:bg-white-200">
               
                <td scope="row" className="ps-6 py-4 font-medium whitespace-nowrap">
                  {index+1}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {comment.content}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {comment.user_id.name}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  })}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {formatDistanceToNow(new Date(comment.updated_at), {
                    addSuffix: true,
                  })}
                </td>
                
                <td className="px-9 py-4">
                  <button 
                  onClick={() => deleteComment(comment._id)} 
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </button>
                </td>
              </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      ))}

    </>
  )
}

export default AllComents