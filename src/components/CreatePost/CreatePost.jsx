import "./CreatePost.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createPost } from "../../api/apiCalls";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const { id } = useSelector((store) => store);

  const onChangeImages = (event) => {
    let newImages = [];
    let i = 0;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[i]);
    reader.onload = () => {
      newImages.push(reader.result);
      console.log(reader.result);
      i++;

      if (i == event.target.files.length) setImages(newImages);
      else {
        reader.readAsDataURL(event.target.files[i]);
      }
    };
  };

  const onClickPost = (event) => {
    event.preventDefault();

    let date = new Date();
    date = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    console.log(date);

    const post = {
      content,
      tag,
      location,
      category,
      images,
      date,
    };

    createPost({ post, id });
  };

  const onExpand = () => {
    setIsMinimized(false);
    setLocation("Adana");
    setCategory("Museum");
  };

  const onMinimize = () => {
    setContent("");
    setTag("");
    setLocation("");
    setCategory("");
    setImages([]);
    setIsMinimized(true);
  };

  if (isMinimized) {
    return (
      <textarea
        rows="1"
        placeholder="What do you think?"
        className="form-control my-post-creator-minimized"
        readOnly
        onClick={onExpand}
      ></textarea>
    );
  } else {
    return (
      <div className="my-post-creator">
        <form>
          <textarea
            className="form-control my-post-creator-content"
            rows="3"
            placeholder="What do you think?"
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
          <div className="my-post-creator-input-wrapper">
            <label
              htmlFor="tag"
              className="form-label"
              style={{ margin: 0, flexBasis: "130px" }}
            >
              <i className="fa-solid fa-hashtag"></i>{" "}
              <span style={{ marginLeft: "0.25rem" }}>Tags</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="Enter your tags here."
              onChange={(event) => setTag(event.target.value)}
            />
          </div>
          <div className="my-post-creator-input-wrapper">
            <label
              htmlFor="location"
              className="form-label"
              style={{ margin: 0, flexBasis: "130px" }}
            >
              <i className="fa-solid fa-location-crosshairs"></i>{" "}
              <span style={{ marginLeft: "0.25rem" }}>Location</span>
            </label>
            <select
              id="location"
              className="form-select"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="Adana">Adana</option>
              <option value="Adıyaman">Adıyaman</option>
              <option value="Afyonkarahisar">Afyonkarahisar</option>
              <option value="Ağrı">Ağrı</option>
              <option value="Aksaray">Aksaray</option>
              <option value="Amasya">Amasya</option>
              <option value="Ankara">Ankara</option>
              <option value="Antalya">Antalya</option>
              <option value="Ardahan">Ardahan</option>
              <option value="Artvin">Artvin</option>
              <option value="Aydın">Aydın</option>
              <option value="Balıkesir">Balıkesir</option>
              <option value="Bartın">Bartın</option>
              <option value="Batman">Batman</option>
              <option value="Bayburt">Bayburt</option>
              <option value="Bilecik">Bilecik</option>
              <option value="Bingöl">Bingöl</option>
              <option value="Bitlis">Bitlis</option>
              <option value="Bolu">Bolu</option>
              <option value="Burdur">Burdur</option>
              <option value="Bursa">Bursa</option>
              <option value="Çanakkale">Çanakkale</option>
              <option value="Çankırı">Çankırı</option>
              <option value="Çorum">Çorum</option>
              <option value="Denizli">Denizli</option>
              <option value="Diyarbakır">Diyarbakır</option>
              <option value="Düzce">Düzce</option>
              <option value="Edirne">Edirne</option>
              <option value="Elazığ">Elazığ</option>
              <option value="Erzincan">Erzincan</option>
              <option value="Erzurum">Erzurum</option>
              <option value="Eskişehir">Eskişehir</option>
              <option value="Gaziantep">Gaziantep</option>
              <option value="Giresun">Giresun</option>
              <option value="Gümüşhane">Gümüşhane</option>
              <option value="Hakkari">Hakkari</option>
              <option value="Hatay">Hatay</option>
              <option value="Iğdır">Iğdır</option>
              <option value="Isparta">Isparta</option>
              <option value="İstanbul">İstanbul</option>
              <option value="İzmir">İzmir</option>
              <option value="Kahramanmaraş">Kahramanmaraş</option>
              <option value="Karabük">Karabük</option>
              <option value="Karaman">Karaman</option>
              <option value="Kars">Kars</option>
              <option value="Kastamonu">Kastamonu</option>
              <option value="Kayseri">Kayseri</option>
              <option value="Kilis">Kilis</option>
              <option value="Kırıkkale">Kırıkkale</option>
              <option value="Kırklareli">Kırklareli</option>
              <option value="Kırşehir">Kırşehir</option>
              <option value="Kocaeli">Kocaeli</option>
              <option value="Konya">Konya</option>
              <option value="Kütahya">Kütahya</option>
              <option value="Malatya">Malatya</option>
              <option value="Manisa">Manisa</option>
              <option value="Mardin">Mardin</option>
              <option value="Mersin">Mersin</option>
              <option value="Muğla">Muğla</option>
              <option value="Muş">Muş</option>
              <option value="Nevşehir">Nevşehir</option>
              <option value="Niğde">Niğde</option>
              <option value="Ordu">Ordu</option>
              <option value="Osmaniye">Osmaniye</option>
              <option value="Rize">Rize</option>
              <option value="Sakarya">Sakarya</option>
              <option value="Samsun">Samsun</option>
              <option value="Şanlurfa">Şanlurfa</option>
              <option value="Siirt">Siirt</option>
              <option value="Sinop">Sinop</option>
              <option value="Şırnak">Şırnak</option>
              <option value="Sivas">Sivas</option>
              <option value="Tekirdağ">Tekirdağ</option>
              <option value="Tokat">Tokat</option>
              <option value="Trabzon">Trabzon</option>
              <option value="Tunceli">Tunceli</option>
              <option value="Uşak">Uşak</option>
              <option value="Van">Van</option>
              <option value="Yalova">Yalova</option>
              <option value="Yozgat">Yozgat</option>
              <option value="Zonguldak">Zonguldak</option>
            </select>
          </div>
          <div className="my-post-creator-input-wrapper">
            <label
              htmlFor="category"
              className="form-label"
              style={{ margin: 0, flexBasis: "130px" }}
            >
              <i className="fa-solid fa-landmark"></i>{" "}
              <span style={{ marginLeft: "0.25rem" }}>Category</span>
            </label>
            <select
              id="category"
              className="form-select"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Museum">Museum</option>
              <option value="Historical Site">Historical Site</option>
              <option value="Natural Wonder">Natural Wonder</option>
              <option value="Park">Park</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="my-post-creator-input-wrapper">
            <label
              htmlFor="images"
              className="form-label"
              style={{ margin: 0, flexBasis: "130px" }}
            >
              <i className="fa-solid fa-image"></i>{" "}
              <span style={{ marginLeft: "0.25rem" }}>Images</span>
            </label>
            <input
              className="form-control"
              type="file"
              id="images"
              multiple
              onChange={onChangeImages}
            />
          </div>
          <button
            onClick={onClickPost}
            className="btn btn-primary"
            style={{ fontWeight: 500 }}
          >
            Post
          </button>
          <button
            onClick={onMinimize}
            className="btn btn-primary"
            style={{ marginLeft: "0.5rem", fontWeight: 500 }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
