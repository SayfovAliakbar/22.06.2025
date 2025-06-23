import React, { useEffect, useState } from 'react'
import logo from "./assets/Frame.png"
import back1 from "./assets/Frame (1).png"
import comp1 from "./assets/Rectangle.png"
import comp2 from "./assets/Frame (2).png"
import back2 from "./assets/Frame (3).png"
import zone from "./assets/image 1.png"
import img1 from "./assets/Rectangle (1).png"
import img2 from "./assets/Frame (4).png"
import img3 from "./assets/Frame (5).png"
import img4 from "./assets/Frame (6).png"
import img5 from "./assets/Frame (7).png"
import img6 from "./assets/Frame (8).png"
import logo2 from "./assets/Rectangle (2).png"
import { Button, Input, Modal, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons';


const App = () => {

  let API = "http://localhost:3000/data"
  let [data, setData] = useState([])

  async function getUser() {
    try {
      let response = await fetch(API)
      let data = await response.json()
      setData(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser()
  },[])

  async function deleteUser(id) {
    try {
      await fetch(`${API}/${id}`, {method: "Delete"})
      getUser()
    } catch (error) {
      console.error(error);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelInfo = () => {
    setIsInfoModalOpen(false);
  };

  let [addName, setAddName] = useState("")
  let [addStatus, setAddStatus] = useState("true")

  async function addUser(){
    let newUser = {
      name: addName,
      status: addStatus == "true"? true:false,
      img: "./src/assets/Frame (10).png"
    }
    try {
      await fetch(API, {
        method: "POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify(newUser)
      })
      getUser()
      setIsModalOpen(false)
    } catch (error) {
      console.error(error);
    }
  }

  let [search, setSearch] = useState("")

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  let [editName, setEditName] = useState("")
  let [editStatus, setEditStatus] = useState("true")
  let [editImg, setEditImg] = useState("")
  let [idx, setIdx] = useState(null)

  async function openEditModal(e) {
    setIsEditModalOpen(true)
    setEditName(e.name)
    setEditStatus(e.status ? "true" : "false")
    setEditImg(e.img)
    setIdx(e.id)
  }

  async function editUser() {
    let updeteUser = {
      img: editImg,
      name: editName,
      status: editStatus == "true"
    }

    try {
      await fetch(`${API}/${idx}`, {
        method: "PUT",
        headers: {"Content-type":"application/json"},
        body:JSON.stringify(updeteUser)
      })
      getUser()
      setIsEditModalOpen(false)
    } catch (error) {
      console.error(error);
      
    }
  }

  let [select, setSelect] = useState("")

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  let [infoName, setInfoName] = useState("")
  let [infoStatus, setInfoStatus] = useState("")
  let [infoImg, setInfoImg] = useState("")

  async function openInfoModal(e) {
    setIsInfoModalOpen(true)
    setInfoName(e.name)
    setInfoStatus(e.status ? "Active" : "Inactive")
    setInfoImg(e.img)
  }

  async function changeStatus(el) {
    let updeteUser = {
      img: el.img,
      name: el.name, 
      status: !el.status,
    }

    try {
      await fetch(`${API}/${el.id}`, {
        method: "PUT",
        headers: {"Content-type":"application/json"},
        body:JSON.stringify(updeteUser)
      })
      getUser()
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center p-[20px] text-[20px]'>
        <div className='gap-[25px] sm:hidden lg:flex'>
          <p>Shop</p>
          <p>Explore</p>
        </div>

        <img src={logo} alt="" />

        <p>My Cart</p>
      </div>

      <img src={back1} className='w-[100%]'/>

      <div className='text-white text-center absolute sm:top-[150px] sm:left-[25%] lg:top-[250px] lg:left-[35%]'>
        <h1 className='sm:text-[30px] lg:text-[50px]'>The Desk Shelf System</h1>
        <p>Available in Walnut or Maple</p>
        <p>LEARN MORE</p>
      </div>

      <br/><br/>

      <div className='text-[18px] text-center'>
        <h1 className='sm:text-[30px] lg:text-[50px]'>Design Inspires</h1>
        <br/>
        <p>Build your dream workspace, so you can get your best work done.</p>
        <br/>
        <button>GET STARTED</button>
      </div>

      <br/><br/>

      <div className='flex justify-around items-center flex-wrap text-center gap-[50px]'>
        <div>
          <img src={comp1} alt="" />
          <h3 className='text-[25px]'>Desk Pads</h3>
          <br/>
          <p>LEARN MORE</p>
        </div>

        <div>
          <img src={comp2} alt="" />
          <h3 className='text-[25px]'>Laptop Stands</h3>
          <br/>
          <p>LEARN MORE</p>
        </div>
      </div>

      <br/><br/><br/>

      <div className='flex flex-wrap gap-[15px] justify-around items-center'>
        <input type="search" placeholder='Search...' className='border w-[250px] h-[30px] rounded-[10px]' value={search} onChange={(e) => setSearch(e.target.value)}/>

        <Select value={select} onChange={(value) => setSelect(value)} style={{width: "200px"}}>
          <Select.Option value="">All</Select.Option>
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>

        <Button type="primary" onClick={showModal}>Add New User</Button>
      </div>

      <br/><br/>

      <Modal
        title="Please Add New User"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={addUser}
        onCancel={handleCancel}
      >
        <Input size="large" placeholder="Name" prefix={<UserOutlined />} value={addName} onChange={(e) => setAddName(e.target.value)}/>
        <br/><br/>
        <Select value={addStatus} onChange={(value) => setAddStatus(value)} style={{width: "120px"}}>
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>

      </Modal>

      <Modal
        title="Please Edit This User"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isEditModalOpen}
        onOk={editUser}
        onCancel={handleCancelEdit}
      >
        <Input size="large" placeholder="Name" prefix={<UserOutlined />} value={editName} onChange={(e) => setEditName(e.target.value)}/>
        <br/><br/>
        <Select value={editStatus} onChange={(value) => setEditStatus(value)} style={{width: "120px"}}>
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>
      </Modal>

      <Modal
        title="Information about the selected user:"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isInfoModalOpen}
        onOk={handleCancelInfo}
        onCancel={handleCancelInfo}
      >
        <div className='text-center'>
          <img src={infoImg} alt="" className='m-auto'/>
          <br/>
          <h1 className='text-[30px]'> <b>{infoName}</b> </h1>
          <br/>
          <p className={infoStatus == "Active" ? "text-green-600 text-[20px]" : "text-red-500 text-[20px]"}> <b>{infoStatus}</b> </p>
        </div>
      </Modal>

      <div className='flex justify-around items-center flex-wrap gap-[50px]'>
        {
          data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())).filter((ele) => ele.status.toString().includes(select)).map((el) => {
            return (
              <div key={el.id} className='text-center'>
                <img src={el.img} alt="" />
                <br/>
                <p>{el.name}</p>
                <br/>
                <p className={!el.status ? "text-red-500" : "text-green-600"}> <b>{el.status ? "Active" : "Inactive"}</b> </p>
                <br/>
                <div className='flex justify-between items-center'>
                  <Button onClick={() => openEditModal(el)}>Edit</Button>

                  <Button danger onClick={() => deleteUser(el.id)}>Delete</Button>

                  <Button onClick={() => openInfoModal(el)}>Info</Button>

                  <input type="checkbox" onClick={() => changeStatus(el)}/>
                </div>
              </div>
            )
          })
        }
      </div>

      <br/><br/><br/>

      <div className='text-center'>
        <h1 className='sm:text-[35px] lg:text-[50px]'>Featured Products</h1>
        <br/>
        <p>See What’s Trending Right Now</p>
        <p className='text-[40px]'> <b>...</b> </p>
      </div>

      <br/><br/>

      <img src={back2} className='w-[100%]' alt="" />

      <br/><br/>

      <div className='flex justify-center'>
        <div className='text-center text-[18px]'>
          <h1 className='sm:text-[35px] lg:text-[50px]'>Made The Hard Way</h1>
          <br/>
          <p>Our signature craftsmanship has been honed over a decade of manufacturing <br/> innovation here in Portland, Oregon. We combine the skills of our small in-house <br/> team with the collective strength of  collaborators throughout the US to deliver </p>
          <br/>
          <img src={zone} alt="" />
        </div>
      </div>

      <br/><br/>

      <div className='text-center'>
        <h1 className='sm:text-[35px] lg:text-[50px]'>Make Work Meaningful</h1>
        <br/>
        <p>We're here because we believe that your work deserves the best. A team that loves working <br/> together is the magic that makes it all happen.</p>
      </div>

      <br/><br/>

      <div className='flex justify-around items-center flex-wrap gap-[50px]'>
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />

        <img src={img6} alt="" />
        <img src={img5} alt="" />
        <img src={img4} alt="" />
        <img src={img3} alt="" />
        <img src={img2} alt="" />
        <img src={img1} alt="" />

        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <img src={img4} alt="" />
        <img src={img5} alt="" />
        <img src={img6} alt="" />

        <img src={img6} alt="" />
        <img src={img5} alt="" />
        <img src={img4} alt="" />
        <img src={img3} alt="" />
        <img src={img2} alt="" />
        <img src={img1} alt="" />
      </div>

      <br/><br/>

      <div className='text-center'>
        <h1 className='sm:text-[35px] lg:text-[50px]'>We Hope You'll Join Us</h1>
        <br/>
        <p>READ MORE ABOUT OUR STORY</p>
      </div>

      <br/><br/>

      <div className='bg-[#9AA8B1] flex justify-center text-white sm:p-[20px] lg:p-[70px]'>
        <div className='text-center'>
          <img src={logo2} alt="" className='sm:ml-[42%]'/>
          <br/>
          <h1 className='sm:text-[35px] lg:text-[50px]'>Design Inspires</h1>
          <br/>
          <p>Build your dream workspace, so you can get your best work done.</p>
        </div>
      </div>

      <br/><br/>

      <div className='bg-[#F9F9F9] p-[50px]'>
        <div className='flex justify-between items-start flex-wrap gap-[50px]'>
          <div className='flex gap-[25px] items-start'>
            <div>
              <p>Shop</p>
              <p>About</p>
              <p>Journal</p>
              <p>Support</p>
              <p>COVID-19 Info</p>
              <p>Order Status</p>
              <p>Corporate Sales</p>
            </div>

            <div>
              <h2 className='text-[25px]'>Newsletter Signup</h2>
              <br/>
              <p>Sign up to our Newsletter to hear about new product <br/> releases,  learn about our design process, and everything <br/> else going on behind the scenes at Grovemade.</p>
              <br/>
              <hr/>
              <br/>
            </div>
          </div>

          <button className='text-white bg-black w-[80px] h-[80px] sm:ml-[40%] lg:ml-[0px]'>GO <br/> UP</button>
        </div>
      </div>
    </div>
  )
}

export default App