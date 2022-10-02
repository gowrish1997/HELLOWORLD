import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",

    boxSizing: "border-box",
  },
  informationcontainer: {
    width: "30%",
    height: "200px",
    boxSizing: "border-box",
    margin: "10px",
    backgroundColor: "#F5F5F5",
    border: "1px solid black",
    borderRadius: "10px",
    padding: "1px",
  },
  imagecontaner: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
const Paginationimage = () => {
  const [image, setimages] = useState([]);
  const [limit, setlimit] = useState(10);
  const divref = useRef();
  useEffect(() => {
    async function getimages() {
      try {
        const images = await axios.get(
          `https://dummyjson.com/products?skip=5&limit=${limit}`
        );
        console.log(images.data.products);
        setimages(images.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    getimages();
  }, [limit]);
  function scrollhandler() {
    if (divref.current) {
      console.log("hello");
      const { scrollTop, scrollHeight, clientHeight } = divref.current;
      console.log(scrollTop, scrollHeight, clientHeight);
      if (scrollTop + clientHeight + 2 >= scrollHeight) {
        console.log("reached bottom");
        setlimit((prev) => prev + 5);
      }
    }
  }
  return (
    <div
      ref={divref}
      onScroll={scrollhandler}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div style={style.container}>
        {image &&
          image.map((data) => {
            return (
              <div style={style.informationcontainer}>
                <div style={style.imagecontaner}>
                  <img style={style.img} src={data.images[0]}></img>
                </div>
                <div>{data.title}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paginationimage;
