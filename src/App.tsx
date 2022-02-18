import React, { useState } from 'react';
import './App.css';
import { Popover, Typography, Rate, Menu, Card } from 'antd';

type RateState = [Map<string, number>, React.Dispatch<React.SetStateAction<Map<string, number>>>];

const { Title, Paragraph } = Typography;

const text = "This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.";

const popCtrl = (setHovered: React.Dispatch<React.SetStateAction<boolean>>) => {
  return (visible: boolean) => {
    setHovered(visible);
  };
}

const hoverColor = (hovered: boolean) => {
  return hovered ? 'MyClass' : undefined;
}

const ratePopup = (word: string, rateRef: RateState) => {
  const [rates, setRates] = rateRef;
  const realWord = word.replace(/[^0-9a-z]/gi, '')
  return (
    <Rate onChange={(value) => {
      rates.set(realWord, value);
      setRates(rates);
    }} />
  )
}
const WordCell = (i: number, word: string, rateRef: RateState) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Popover key={i} className={hoverColor(hovered)} content={ratePopup(word, rateRef)} onVisibleChange={popCtrl(setHovered)} destroyTooltipOnHide={true}>
      {`${word} `}
    </Popover>
  )
}

const resultEntry = (rates: Map<string, number>) => {
  const entries = new Array<JSX.Element>();
  rates.forEach((rate, word) => {
    entries.push(<p key={word}>{word} : {rate}</p>);
  });
  return entries;
}

function App() {
  const rateRef = useState(new Map<string, number>());
  const [rates] = rateRef;

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <Menu>
        <Menu.Item key={1}>
          <Title>
            Demo
          </Title>
        </Menu.Item>
      </Menu>
      <div style={{ padding: 24, backgroundColor: 'f5f5f5' }}>
        <Typography style={{ backgroundColor: 'white' }}>
          <Paragraph style={{ padding: '1.5em', fontSize: '18px' }}>
            {text.split(" ").map((word, i) => WordCell(i, word, rateRef))}
          </Paragraph>
        </Typography>

        <Card title={"Result"} bordered={false}>
          {resultEntry(rates)}
        </Card>
      </div>
    </div>
  );
}

export default App;
