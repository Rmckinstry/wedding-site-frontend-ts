import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQ } from "../../utility/types";

function FAQDesktop({ faq }: { faq: FAQ }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <Accordion
        className="faq-desktop-container"
        expanded={expanded}
        onChange={(event, isExpanded) => setExpanded(isExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <p className="faq-title-desktop font-sm-med">{faq.question}</p>
        </AccordionSummary>
        <AccordionDetails>
          <p className="faq-answer-desktop font-sm">{faq.answer}</p>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default FAQDesktop;
