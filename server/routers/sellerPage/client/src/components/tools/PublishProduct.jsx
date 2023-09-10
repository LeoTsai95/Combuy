import React, { useState } from 'react';
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:2407'; // 建議使用環境變數管理

function PublishProduct({ productId, fetchProducts }) { 
    const [showModal, setShowModal] = useState(false);
    
    const handlePublish = async (prod_id) => {
        console.log(prod_id);
        
        try {
            const response = await axios.put(`${API_BASE_URL}/down/${prod_id}`, { publish: 1 });
            if (response.status === 200) {
                alert('商品已上架');
                fetchProducts(); // 刷新商品列表
            } else {
                throw new Error('Server responded with a non-200 status code');
            }
        } catch (error) {
            console.error("在handlePublish中出現錯誤:", error);
            alert('上架失敗，請再試一次');
        }
        setShowModal(false);
    }


    return (
        <>
            <div className="publishProduct" onClick={() => setShowModal(true)}>上架</div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                        <p>是否將商品上架？</p>
                        <button onClick={() => handlePublish(productId)}>確定上架</button>
                        <button onClick={() => setShowModal(false)}>取消</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default PublishProduct;