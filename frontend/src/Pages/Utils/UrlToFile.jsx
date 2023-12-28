const getBlobFromUrl = (myImageUrl) => {
  return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', myImageUrl, true);
      request.responseType = 'blob';
      request.onload = () => {
          resolve(request.response);
      };
      request.onerror = reject;
      request.send();
  })
}

const getDataFromBlob = (myBlob) => {
  return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(myBlob)
      
  })
}

const convertUrlToImageData = async (myImageUrl) => {
  try {
      let myBlob = await getBlobFromUrl(myImageUrl);
      console.log(myBlob)
      let myImageData = await getDataFromBlob(myBlob);
      console.log(myImageData)
      return myImageData;
  } catch (err) {
      console.log(err);
      return null;
  }
}

export default convertUrlToImageData;