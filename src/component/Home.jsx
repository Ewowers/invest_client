import React, { useEffect, useState } from "react";
import "../style/Home.css";
import Headers from "./Header";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Carousel, Row, Col, Button, Input, Typography, Card } from "antd";
import { Link } from "react-router-dom";
import stat1 from "../image/home/stat_icon1.png";
import stat2 from "../image/home/stat_icon2.png";
import stat3 from "../image/home/stat_icon3.png";
import stat4 from "../image/home/stat_icon4.png";
import app from "../image/home/Image.png";
import imageSlide from "../image/home/slider.png";
import bgMask from "../image/BG Mask.png";
import fetchs from "../util/xml";
import mail from "../image/Illustration.png";
import footerImage from "../image/footer.png";
import footerBack from "../image/footerback.png";
const mob = document.querySelector("body").offsetWidth > 880;
const { Meta } = Card;
const Service = () => {
  //ссылки
  return (
    <Row justify="center">
      <Col span={23}>
        <div className="collapss">
          <Link to="/investor" className="links">
            Партнерствам <ArrowRightOutlined />
          </Link>
          <Link to="/cooperative" className="links">
            Сотрудничество <ArrowRightOutlined />
          </Link>
          <Link to="/applicant" className="links">
            Соискателям <ArrowRightOutlined />
          </Link>
        </div>
      </Col>
    </Row>
  );
};
const Slider = () => {
  //банер
  const Slide = () => {
    return (
      <div className="home_slide" style={{ minHeight: 400 }}>
        <div className="home_slide_image" style={{ backgroundImage: "url('" + imageSlide + "')" }}></div>
        <div className="home_slide_content" style={{ flexDirection: "column", alignItems: "center" }}>
          <Service />
        </div>
      </div>
    );
  };
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col md={23}>
        <Slide />
      </Col>
    </Row>
  );
};

const OurSpeak = () => {
  //цитаты
  const style = {
    slideItem: {
      body: {
        background: "#fff",
        padding: "25px 50px",
        borderRadius: 10,
      },
      title: {
        textAlign: "center",
      },
    },
    commentAuthor: {
      body: {
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        color: "#fff",
        justifyContent: "center",
        height: "max-content",
      },
      img: { marginRight: 25 },
    },
  };
  const Slide = () => {
    return (
      <Row gutter={50} style={{ paddingBottom: 100 }}>
        <Col md={12}>
          <div style={style.slideItem.body}>
            <p>Если вам тяжело представить, что вы можете получить 20% убытков, торгуя на финансовых рынках, то вы не должны торговать вообще</p>
            <p style={{ textAlign: "right" }}>© Джон Богл (John Bogle)</p>
          </div>
        </Col>
        <Col md={12}>
          <div style={style.slideItem.body}>
            <p>«Сколько вы знаете миллионеров, которые стали богаты, инвестируя в банковские депозиты? Вот то-то же».</p>
            <p style={{ textAlign: "right" }}>© Роберт Аллен (Robert Allen)</p>
          </div>
        </Col>
      </Row>
    );
  };
  return (
    <Row justify="center" style={{ background: "#5E4C5A", marginTop: 50, paddingTop: 50 }}>
      <Col md={20}>
        <p className="title" style={{ margin: 0, color: "#fff" }}>
          <strong>Out clients speak</strong>
        </p>
        <Carousel>
          <Slide />
          <Slide />
          <Slide />
        </Carousel>
      </Col>
    </Row>
  );
};

const Projects = () => {
  //проекты
  const [proj, setProj] = useState([]);
  useEffect(() => {
    fetchs.get("/api/project").then((res) => {
      let arr = [...res.data];
      if (arr.length > 6) arr.length = 6;
      setProj(arr);
    });
  }, []);
  const Project = ({ item }) => {
    const redirect = () => (window.location.href = "/project/" + item.id);
    return (
      <Col md={4} span={12}>
        <Card hoverable onClick={redirect} cover={<img alt={item.title} src={item.image} />}>
          <Meta title={item.title} description={item.descriptionMin} />
        </Card>
      </Col>
    );
  };
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col md={23}>
        <Row gutter={25}>
          {proj.map((item, i) => (
            <Project item={item} key={i} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};
const Who = () => {
  const { Title } = Typography;
  //кто мы
  return (
    <Row justify="center" style={{ marginTop: 50, marginBottom: 50 }}>
      <Col md={20}>
        <Title>Кто мы?</Title>
        <p>
          Сейчас столько талантливых людей, которые не могут воплотить свои идей в реальность. На это много причин, один из основных - отсутствие инвестиции под
          свой проект. Инвестиции можно привлечь несколькими способами, это займы с Банков, но при этом ни у каждого имеется залоговое имущество или
          первоначальный взнос. Да и высокие ставки не дают возможности нормально раскрутиться. А привлечение Инвесторов напрямую требует определенного доверия
          со стороны Инвесторов. К сожалению, существующие платформы для привлечения инвестиций не полностью удовлетворяют требованиям, как Инвесторов, так и
          Соискателей, в первую очередь из-за отсутствия сопутствующих инструментов для защиты интересов каждой из сторон.
        </p>
        <p>
          Наша Платформа поможет воплотить Ваши идей в реальность путем обеспечения прозрачных бизнес процессов и безопасности за свои идеи и инвестиции. Мы не
          являемся биржевой платформой, мы помогаем воплощать идею в реальность по условиям, согласованным всеми участниками проекта. Наши главные принципы
          прозрачность, честность и справедливость.
        </p>
        <p>Реализовывайте свои идеи и наслаждайтесь процессом. Надеюсь, наша Платформа поможет Вам в достижении Ваших целей.</p>
      </Col>
    </Row>
  );
};
const DowloadApp = () => {
  //услуги
  const style = {
    block: {
      item: {
        padding: mob ? "50px 100px" : 15,
        margin: mob ? 0 : 20,
        borderRadius: mob ? 0 : 10,
        display: "flex",
        alignItems: "center",
      },
    },
  };
  const service = [
    {
      title: "Инструмент для использования при распределении доходной части",
      description: "доходная часть будет распределена между участниками согласно условиям, оговоренным в учредительном договоре",
    },
    {
      title: "Юридическое сопровождение",
      description:
        "осуществляем сопровождение по всем юридическим вопросам, включая осуществление гражданско-правовых сделок, защита интересов в судебных исполнительных органах и т.д",
    },
    {
      title: "Подготовка бизнес планов",
      description: "ведем разработку бизнес планов, которая в последующем на платформе будет отображена как Проверенная",
    },
    {
      title: "Услуги кадрового сопровождения",
      description: "осуществляем сопровождение по кадровым вопросам, заполнение табелей, издание приказов и т.д.",
    },
    {
      title: "Услуги бухгалтерского сопровождения",
      description: "осуществляем полное сопровождение бухгалтерии, включая Услуги указанные в первом и вторых пунктах",
    },
    {
      title: "Команда управление проектами",
      description:
        "Сопровождаем проекты по технических и технологическим вопросам, начиная с самого начала и включая период осуществления полноценной деятельности",
    },
  ];
  return (
    <Row justify="center" style={{ marginTop: 100 }}>
      <Col md={20}>
        <Row justify="space-between" align="bottom">
          <Col md={10}>
            <p style={{ margin: 0, fontSize: mob ? 48 : 24 }}>
              <strong>Наши услуги</strong>
            </p>
            <img src={app} alt="app" width="100%" height={mob ? 715 : "100%"} />
          </Col>
          <Col md={13} className="scrollBar" style={{ maxHeight: 715, overflow: "scroll", overflowX: "unset" }}>
            <div style={{ ...style.block.item, background: "#5E4C5A", color: "#fff" }}>
              <img src={stat1} alt="123" style={{ marginRight: 50 }} />
              <div>
                <p style={{ margin: 0, fontSize: 24 }}>
                  <strong>Инструмент для использования при согласовании каждого исходного платежа</strong>
                </p>
                <p style={{ fontSize: 18 }}>
                  не позволит осуществить ни один платеж без подтверждения всех по списку согласующих, в соответствии с учредительным договором
                </p>
              </div>
            </div>
            {service.map((item, i) => (
              <div style={{ ...style.block.item, background: "#F1E4FF", color: "#000" }} key={i}>
                <img src={stat1} alt="123" style={{ marginRight: 50 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 18 }}>
                    <strong>{item.title}</strong>
                  </p>
                  <p style={{ fontSize: 14 }}>{item.description}</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const Instruction = () => {
  //Премущество работать с нами
  const Item = ({ title, description, icon }) => {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={icon} alt="1" style={{ marginRight: 15 }} />
          <div style={{}}>
            <p style={{ margin: 0, fontSize: 24 }}>
              <strong>{title}</strong>
            </p>
            <p style={{ margin: 0, fontSize: 16 }}>{description}</p>
          </div>
        </div>
      </div>
    );
  };
  const list = [
    {
      icon: stat1,
      title: "Time zones ain’t no thing",
      descroption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
    },
    {
      icon: stat2,
      title: "Full spectrum of services",
      descroption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
    },
    {
      icon: stat3,
      title: "Impossible? We’re on it",
      descroption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
    },
    {
      icon: stat4,
      title: "Flexible work terms",
      descroption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
    },
    {
      icon: stat4,
      title: "Flexible work terms",
      descroption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
    },
    {
      icon: stat4,
      title: "Flexible work terms",
      descroption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
    },
  ].map((item, i) => <Item icon={item.icon} title={item.title} description={item.descroption} key={i} />);
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col md={20}>
        <p className="title">
          <strong>Премущество работать с нами</strong>
        </p>
        <div className="staticList">{list}</div>
      </Col>
    </Row>
  );
};
const Mail = () => {
  const { Title } = Typography;
  //feedback
  return (
    <Row justify="center">
      <Col span={20} style={{ height: 250, marginTop: 50, marginBottom: 50, backgroundImage: "url(" + bgMask + ")", backgroundSize: "100% 100%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <img alt="feedback" src={mail} style={{ marginRight: 50 }} />
          <div>
            <Title>Форма запроса услуг</Title>
            <div style={{ display: "flex" }}>
              <Input placeholder="Ваша почта" />
              <Button style={{ background: "#000000", color: "#ffffff", borderRadius: 5, borderColor: "#000000" }}>Отправить</Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
const Footer = () => {
  // футер
  return (
    <Row className="footer" style={{ background: "#000000", paddingBottom: 50, paddingTop: 50 }} justify="center">
      <Col span={20}>
        <img src={footerBack} alt="f" style={{ position: "absolute", bottom: 0, left: 0 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <img src={footerImage} alt="footer" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridGap: 25 }}>
            <ul>
              <p style={{ fontSize: 20 }}>Product</p>
              <li>
                <Link to="/a">Overview</Link>
              </li>
              <li>
                <Link to="/a">Features</Link>
              </li>
              <li>
                <Link to="/a">Tutorials</Link>
              </li>
              <li>
                <Link to="/a">Pricing</Link>
              </li>
              <li>
                <Link to="/a">Releases</Link>
              </li>
            </ul>
            <ul>
              <p style={{ fontSize: 20 }}>Company</p>
              <li>
                <Link to="/a">About</Link>
              </li>
              <li>
                <Link to="/a">Press</Link>
              </li>
              <li>
                <Link to="/a">Careers</Link>
              </li>
              <li>
                <Link to="/a">Contact</Link>
              </li>
              <li>
                <Link to="/a">Partners</Link>
              </li>
            </ul>
            <ul>
              <p style={{ fontSize: 20 }}>Support</p>
              <li>
                <Link to="/a">Help Center</Link>
              </li>
              <li>
                <Link to="/a">Terms of service</Link>
              </li>
              <li>
                <Link to="/a">Legal</Link>
              </li>
              <li>
                <Link to="/a">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/a">Status</Link>
              </li>
            </ul>
          </div>
        </div>
      </Col>
    </Row>
  );
};
const Home = () => {
  return (
    <div className="Home">
      <Headers />
      {/* хедер */}
      <Slider />
      {/* баннер */}
      <Projects />
      {/* проекты */}
      <Who />
      {/* Кто мы */}
      <Instruction />
      {/* Премущество работать с нами */}
      <DowloadApp />
      {/* Наши услуги */}
      <OurSpeak />
      {/* Цитаты */}
      <Mail />
      {/* отправка на почту */}
      <Footer />
      {/* футер */}
    </div>
  );
};
export default Home;
