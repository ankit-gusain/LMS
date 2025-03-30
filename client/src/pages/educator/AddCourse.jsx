import uniqid from 'uniqid'
import Quill from 'quill'
import { useEffect, useRef, useState } from 'react'
import { assets } from '../../assets/assets'

const AddCourse = () => {

    const quillRef = useRef(null)
    const editorRef = useRef(null)

    const [courseTitle, setCourseTitle] = useState('')
    const [coursePrice, setCoursePrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [image, setImage] = useState(null)
    const [chapters, setChapters] = useState([])
    const [showPopup, setShowPopup] = useState(null)
    const [currentChapterId, setCurrentChapterId] = useState(null)
    const [lectureDetails, setLectureDetails] = useState(
        {
            lectureTitle: '',
            lectureDuration: '',
            lectureUrl: '',
            isPreviewFree: false
        }
    )


    //handle chapter function
    const handleChapter = (action, chapterId) => {
        if (action === 'add') {
            const title = prompt('Enter Chapter Name:');
            if (title) {
                const newChapter = {
                    chapterId: uniqid(),
                    chapterTitle: " " + title,
                    chapterContent: [],
                    collapsed: false,
                    chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
                };
                setChapters([...chapters, newChapter]);
            }
        } else if (action === 'remove') {
            setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
        } else if (action === 'toggle') {
            setChapters(
                chapters.map((chapter) =>
                    chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
                )
            );
        }
    };

    const handleLecture = (action, chapterId, lectureIndex) => {
        if (action === 'add') {
            setCurrentChapterId(chapterId);
            setShowPopup(true);
        } else if (action === 'remove') {
            setChapters(
                chapters.map((chapter) => {
                    if (chapter.chapterId === chapterId) {
                        chapter.chapterContent.splice(lectureIndex, 1);
                    }
                    return chapter;
                })
            );
        }
    };



    const addLecture = () => {
        setChapters(
            chapters.map((chapter) => {
                if (chapter.chapterId === currentChapterId) {
                    const newLecture = {
                        ...lectureDetails,
                        lectureOrder: chapter.chapterContent.length > 0
                            ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                            : 1,
                        lectureId: uniqid()
                    };
                    chapter.chapterContent.push(newLecture);
                }
                return chapter;
            })
        );
        setShowPopup(false);
        setLectureDetails({
            lectureTitle: '',
            lectureDuration: '',
            lectureUrl: '',
            isPreviewFree: false
        })
    };


    const handleSubmit = (e) => {
        e.preventDefault()
    };


    //quillll

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])



    return (
        <>
            <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 '>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md  w-full text-gray-500'>
                    <div className='flex flex-col gap-1'>
                        <p>Course Title</p>
                        <input
                            onChange={e => setCourseTitle(e.target.value)}
                            value={courseTitle} type="text"
                            placeholder='Type Here '
                            className='outline-none md:py-2.5 py-2 px-3 rounded border bprder-gray-600 '
                            required />

                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Course Description</p>
                        <div ref={editorRef}></div>

                    </div>

                    <div className='flex items-center justify-between flex-wrap'>
                        <div className='flex flex-col gap-1'>
                            <p>Course Price</p>
                            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice}
                                type="number" placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
                        </div>

                        <div className='flex md:flex-row flex-col items-center gap-3'>
                            <p>Course Thumbnail</p>
                            <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
                                <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded' />

                                <input type="file" id="thumbnailImage" onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
                                <img className="max-h-10" src={image ? URL.createObjectURL(image) : " "} alt="" />
                            </label>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p>Discount %</p>
                        <input
                            onChange={e => setDiscount(e.target.value)}
                            value={discount}
                            type='number'
                            placeholder='0'
                            min={0}
                            max={100}
                            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />

                    </div>

                    {/* adding chapters and lectures */}
                    <div>
                        {
                            chapters.map((chapter, chapterIndex) => (
                                <div key={chapterIndex} className='bg-white border rounded-lg mb-4 '>
                                    <div className='flex justify-between items-center p-4 border-b '>
                                        <div className='flex items-center'>
                                            <img src={assets.dropdown_icon}
                                                onClick={() => handleChapter("toggle", chapter.chapterId)}
                                                width={14}
                                                alt=""
                                                className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "rotate-90"} `} />
                                            <span className='font-semibold'>{chapterIndex + 1}{chapter.chapterTitle}</span>
                                        </div>

                                        <span className='text-green-950'>{chapter.chapterContent.length} Lectures</span>
                                        <img
                                            onClick={() => handleChapter("remove", chapter.chapterId)}
                                            src={assets.cross_icon}
                                            alt=""
                                            className='cursor-pointer' />
                                    </div>

                                    {
                                        !chapter.collapsed && (
                                            <div>
                                                {chapter.chapterContent.map((lecture, lectureIndex) => (
                                                    <div key={lectureIndex} className='flex justify-between items-center mb-2 '>
                                                        <span>
                                                            {lectureIndex + 1}  {lecture.lectureTitle} - {lecture.lectureDuration} mins -
                                                            <a href={lecture.lectureUrl}
                                                                target='_blank'
                                                                className='text-blue-500'>Link
                                                            </a> - {lecture.isPreviewFree ? "Free preview" : "Paid"}
                                                        </span>

                                                        <img src={assets.cross_icon} alt="" onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)} />
                                                    </div>
                                                ))}
                                                <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2 ' onClick={() => handleLecture("add", chapter.chapterId)}>+ Add Lecture</div>

                                            </div>
                                        )
                                    }

                                </div>
                            ))
                        }
                        <div className='flex justify-center items-center bg-gray-700 p-2 rounded-lg cursor-pointer text-white' onClick={() => handleChapter("add")} > + Add Chapter</div>
                        {
                            showPopup && (
                                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 px-4'>
                                    <div className='bg-white text-gray-900 p-8 rounded-lg relative w-full max-w-md shadow-lg'>

                                        {/* Title */}
                                        <h2 className='text-2xl font-semibold mb-6 text-center'>Add Lecture</h2>

                                        {/* Lecture Title */}
                                        <div className='mb-6'>
                                            <label className='block text-gray-700 font-medium mb-2'>Lecture Title</label>
                                            <input
                                                type="text"
                                                value={lectureDetails.lectureTitle}
                                                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                                                className='w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                                placeholder="Enter Lecture Title"
                                            />
                                        </div>

                                        {/* Lecture Duration */}
                                        <div className='mb-6'>
                                            <label className='block text-gray-700 font-medium mb-2'>Duration (minutes)</label>
                                            <input
                                                type="text"
                                                value={lectureDetails.lectureDuration}
                                                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                                                className='w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                                placeholder="Enter Duration"
                                            />
                                        </div>

                                        {/* Lecture URL */}
                                        <div className='mb-6'>
                                            <label className='block text-gray-700 font-medium mb-2'>Lecture URL</label>
                                            <input
                                                type="text"
                                                value={lectureDetails.lectureUrl}
                                                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                                                className='w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                                placeholder="Enter Lecture URL"
                                            />
                                        </div>

                                        {/* Is Preview Free */}
                                        <div className='flex items-center gap-4 mb-8'>
                                            <label className='text-gray-700 font-medium'>Is Preview Free?</label>
                                            <input
                                                type="checkbox"
                                                className='h-5 w-5 accent-gray-700'
                                                checked={lectureDetails.isPreviewFree}
                                                onChange={(e) => { setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked }) }}
                                            />
                                        </div>

                                        {/* Add Lecture Button */}
                                        <button
                                            onClick={addLecture}
                                            type='button'
                                            className='w-full bg-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition text-lg font-medium'>
                                            Add Lecture
                                        </button>

                                        {/* Close Icon */}
                                        <img
                                            src={assets.cross_icon}
                                            onClick={() => setShowPopup(false)}
                                            className='absolute top-5 right-5 w-6 cursor-pointer hover:opacity-70 transition'
                                            alt="Close"
                                        />
                                    </div>
                                </div>

                            )
                        }
                    </div>

                    <button type="submit" className='bg-black text-white w-max py-2.5 px-8 rounded my-4'> Add </button>
                </form>

            </div>
        </>
    )
}

export default AddCourse