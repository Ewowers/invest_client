import React from "react";
import { Grid, Row, Col, Typography } from "antd";
import Header from "./Header";
export const Applicant = () => {
  //как начать
  const { Title, Text } = Typography;
  const { md } = Grid.useBreakpoint();
  const column = { padding: md ? 25 : 10 };
  const title = { textAlign: "center", display: "block" };
  return (
    <>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={24} md={20}>
          <Title level={3}>Блок соискателя:</Title>
          <p>
            <span style={{ color: "red" }}>*</span>Вы готовы работать с партнерами, если они готовы вложить свои средства только при использовании инструментов
            предоставляемых Платформой?
          </p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 25 }}>
        <Col md={20} span={24}>
          <Row justify="center">
            <Col span={24} md={8} style={column}>
              <Text strong style={title}>
                Да
              </Text>
              <br />
              <Text>Ваш проект будет отображен как проект, который готов работать с Инвесторами только при использовании инструментов Платформы</Text>
            </Col>
            <Col span={24} md={8} style={{ background: "#5E4C5A", ...column }}>
              <Text strong style={{ color: "#ffffff", ...title }}>
                Нет
              </Text>
              <br />
              <Text style={{ color: "#ffffff" }}>
                Ваш проект будет отображен как проект, который готов работать только с партнерамами, готовых вложить свои средства без использования
                инструментов Платформы
              </Text>
            </Col>
            <Col span={24} md={8} style={column}>
              <Text strong style={title}>
                По договоренности
              </Text>
              <br />
              <Text>Ваш проект будет отображен как проект, где Вы готовы обсуждать условия реализации с партнерамами дополнительно.</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export const Investor = () => {
  const { Title, Text } = Typography;
  const { md } = Grid.useBreakpoint();
  const column = { padding: md ? 25 : 10 };
  const title = { textAlign: "center", display: "block" };
  return (
    <>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={24} md={20}>
          <Title level={3}>Блок партнерам:</Title>
          <p>
            Заполнение регистрационной формы (Проверенный/не проверенный/ продвинутый, при этом Ваши данные не будут отображаться, где либо, Вы всегда будете
            инкогнито, пока Вы сами не захотите иного) приступай к поиску интересующих проектов.
          </p>
          <p>
            <span style={{ color: "red" }}>*</span>Вы готовы инвестировать в заинтересовавший Вас проект только при использовании инструментов предоставляемых
            Платформой?
          </p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 25 }}>
        <Col md={20} span={24}>
          <Row justify="center">
            <Col span={24} md={8} style={column} style={{ ...column, background: "#5E4C5A" }}>
              <Text strong style={{ color: "#ffffff", ...title }}>
                Да
              </Text>
              <br />
              <Text style={{ color: "#ffffff" }}>
                Вы будете отображаться как партнер, который готов вложить свои средства только при использовании инструментов Платформы
              </Text>
            </Col>
            <Col span={24} md={8} style={column}>
              <Text strong style={title}>
                Нет
              </Text>
              <br />
              <Text>
                Вы будете отображаться как партнер, который готов вложить свои средства без использования инструментов Платформы. В данном случае, Платформа не
                несет какой либо ответственности за сохранность ваших инвестиций.
              </Text>
            </Col>
            <Col span={24} md={8} style={{ background: "#5E4C5A", ...column }}>
              <Text strong style={{ color: "#ffffff", ...title }}>
                Не имеет значения
              </Text>
              <br />
              <Text style={{ color: "#ffffff" }}>
                Вы будете отображаться как партнер, который готов вложить свои средства в зависимости от проекта и запроса соискателя
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export const Cooperative = () => {
  const { Title, Text } = Typography;
  const { md } = Grid.useBreakpoint();
  const column = { padding: md ? 25 : 10 };
  const title = { textAlign: "center", display: "block" };
  return (
    <>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={24} md={20}>
          <Title level={3}>Блок сотрудникам:</Title>
          <p>
            Заполнение регистрационной формы (физ. Лицо/ юр. Лицо) заполнение чек листа участвуй в предлагаемых сотрудникам проектах/создай свой партнерский
            проект жди обратной связи
          </p>
          <p>
            <span style={{ color: "red" }}>*</span>Вы готовы участвовать в Партнерском проекте только при использовании инструментов предоставляемых Платформой?
          </p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 25 }}>
        <Col md={20} span={24}>
          <Row justify="center">
            <Col span={24} md={8} style={column}>
              <Text strong style={title}>
                Да
              </Text>
              <br />
              <Text>
                Вы будете отображаться как сотрудник, который готов участвовать в сотрудничиских проектах только при использовании инструментов Платформы
              </Text>
            </Col>
            <Col span={24} md={8} style={{ background: "#5E4C5A", ...column }}>
              <Text strong style={{ color: "#ffffff", ...title }}>
                Нет
              </Text>
              <br />
              <Text style={{ color: "#ffffff" }}>
                Вы будете отображаться как сотрудник, который готов участвовать в сотруднечестве проекта без использования инструментов Платформы. В данном
                случае, Платформа не несет какой либо ответственности за дальнейшую деятельность, осуществляемой в рамках сотрудничество проекта
              </Text>
            </Col>
            <Col span={24} md={8} style={column}>
              <Text strong style={title}>
                Не имеет значения
              </Text>
              <br />
              <Text>
                Вы будете отображаться как сотрудник, который готов участвовать в сотруднечестве проекта в зависимости от проекта и запроса потенциального
                сотрудника.
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export const HowToStart = () => {
  const { Title } = Typography;
  return (
    <>
      <Header />
      <Row justify="center">
        <Col span={24} md={20}>
          <Title level={2}>Как начать?</Title>
        </Col>
      </Row>
      <Applicant />
      <Investor />
      <Cooperative />
    </>
  );
};
