import React , {useState} from 'react'

export default function App() {
  const [selectedFile,setSelectedFile] = useState(null);
  const [picData,setpicData] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    
  }
  const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('files', selectedFile);

  try {
    const response = await fetch('http://localhost:3000/slipcheck',{
      method: 'POST',
      body: formData,
    })
    if (response.ok){
      const data = await response.json();
      setpicData(data);
      alert('picture uploaded succesfully');
      console.log('Response:', data);
    }else{
      alert('uploaded faied ,try again.')
    }

    
  } catch (error) {
    console.error('Error:',error);
    alert('An error occurred while uploading picture.')
    
  }

}  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*'
          onChange={handleFileChange} />
        <input type='submit' value="เลือกรูปภาพ"/>
      </form>
      <p></p>
    </div>
  )
}
