import React from 'react'
import { addpageNo } from '../reduxtoolkit/reducer/pageNoReducer'
import { useDispatch } from 'react-redux'
import './style.css'

function Home() {
const dispatch = useDispatch();
dispatch(addpageNo(1))
  return (
    <>
      {/* ................................................................... */}
      <div class="slider">
        <div class="slides">
            <div id="slides__1" class="slide">
                <div id="asd">
                    <p>New Arrival</p>
                    <p>LATEST BOOKS</p>
                    <p>Novel that will Excite You. Stories that will refresh your mind</p>
                    <a href="#">Shop Now</a>
                </div>
                <div id="fgh"><img src="https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?b=1&k=20&m=1157655660&s=612x612&w=0&h=ekNZlV17a3wd_yN9PhHXtIabO_zFo4qipCy2AZRpWUI=" alt="" srcset="" /></div>
                <a class="slide__prev" href="#slides__3" title="Next"></a>
                <a class="slide__next" href="#slides__2" title="Next"></a>
            </div>
            <div id="slides__2" class="slide">
                <div id="asd">
                    <p>New Arrival</p>
                    <p>LATEST BOOKS</p>
                    <p>Novel that will Excite You. Stories that will refresh your mind</p>
                    <a href="#">Shop Now</a>
                </div>
                <div id="fgh"><img src="https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?b=1&k=20&m=1157655660&s=612x612&w=0&h=ekNZlV17a3wd_yN9PhHXtIabO_zFo4qipCy2AZRpWUI=" alt="" srcset="" /></div>
                <a class="slide__prev" href="#slides__1" title="Next"></a>
                <a class="slide__next" href="#slides__3" title="Next"></a>
            </div>
            <div id="slides__3" class="slide">
                <div id="asd">
                    <p>New Arrival</p>
                    <p>LATEST BOOKS</p>
                    <p>Novel that will Excite You. Stories that will refresh your mind</p>
                    <a href="#">Shop Now</a>
                </div>
                <div id="fgh"><img src="https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?b=1&k=20&m=1157655660&s=612x612&w=0&h=ekNZlV17a3wd_yN9PhHXtIabO_zFo4qipCy2AZRpWUI=" alt="" srcset="" /></div>
                <a class="slide__prev" href="#slides__2" title="Next"></a>
                <a class="slide__next" href="#slides__1" title="Next"></a>
            </div>
        </div>
    </div>
      {/* ................................................................... */}
    </>
  )
}

export default Home