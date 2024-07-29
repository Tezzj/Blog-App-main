

const Footer = () => {
  return (
    <>
    <div className='mt-8 w-full bg-black md:px-[300px] flex justify-between text-sm md:text-md px-8 py-8 md:mt-8'>
    <div className='flex flex-col text-white'>
        <p>Featured Blogs</p>
        <p>Most viewed</p>
        <p>Readers choice</p>
    </div>
    
    <div className='flex flex-col text-white'>
        <p>Most engaging</p>
        <p>Recent Posts</p>
    </div>
    
    <div className='flex flex-col text-white'>
        <p>Privacy Policy</p>
        <p>About us</p>
        <p>Terms & Conditions</p>
        <p>Terms & Services</p>
    </div>
      
    </div>
    <p className='py-2 pb-6 text-center text-white bg-black text-sm'>All rights reserved @2024</p>
    </>
  )
}

export default Footer