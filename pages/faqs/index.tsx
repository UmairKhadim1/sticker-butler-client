import React from 'react';
import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import Header from '../../components/Header';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const FAQs: NextPage = () => {
  const accordionData = [
    {
      title: 'What is Sticker Butler',
      content: `Sticker Butler is a SaaS platform for brands and retailers to delight their customers with stickers via direct mail. While traditional mailers provide zero tangible value other than information and discounts, Sticker Butler facilitates brand interaction awareness through a usable physical medium. Who doesn’t like a good sticker?`,
    },
    {
      title: 'How do I measure campaign performance?',
      content: `Sticker Butler  automatically tracks each Shopify customer that receives a sticker postcard for 45 days. Sticker Butler also tracks coupon codes. If you create a unique coupon code for a campaign, you track all Shopify orders using that code. You can also upload and track Shopify single use unique coupon codes.`,
    },
    {
      title: 'How many Postcards can I send?',
      content: `We can send as many as you need! For orders of 10,000 cards or let us know about your project by sending us a note at Lance@sundae.io `,
    },
    {
      title: 'How many stickers can I add to each postcard?',
      content: `You can add up to 5 die cut stickers per postcard! `,
    },
    {
      title: 'How long does it take?',
      content: `Our orders generally take 10-14 days to process before they are mailed to your customers. Please be aware of these timelines as you are organizing your campaigns! `,
    },
  ];
  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="pt-5p"
      >
        <Grid item md={9} sm={10}>
          <Accordion allowZeroExpanded>
            {accordionData.map((item, key) => (
              <AccordionItem key={key}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <b>{item.title}</b>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>{item.content}</AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default FAQs;
