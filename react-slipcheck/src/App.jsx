import React, { useState } from 'react';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [picData, setPicData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('กรุณาเลือกรูปภาพก่อน');
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      const response = await fetch('http://localhost:3000/slipcheck', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setPicData(data);
        alert('อัพโหลดรูปภาพสำเร็จ');
        console.log('Response:', data);
      } else {
        alert('อัพโหลดล้มเหลว กรุณาลองใหม่');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดขณะอัพโหลดรูปภาพ');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input type="submit" value="เลือกรูปภาพ" />
      </form>
      {picData && (
        <div>
          <p>ธนาคารผู้ส่ง: {picData.data.sendingBank}</p>
          <p>ผู้ส่ง: {picData.data.sender.displayName}</p>
          <p>ธนาคารผู้รับ: {picData.data.receivingBank}</p>
          <p>ผู้รับ: {picData.data.receiver.displayName}</p>
          <p>จำนวนเงิน: {picData.data.amount}</p>
        </div>
      )}
      {imageUrl && <img src={imageUrl} alt="Preview" height={300} />}
    </div>
  );
}
