import React, { useEffect, useState } from "react";
import { CustomResponseType, ErrorType, Guest, RSVP } from "../../utility/types.ts";
import { convertUtcToCst } from "../../utility/util.ts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import PartyRow from "./PartyRow.tsx";

export interface AdminPartyEditorProps {
  guestData: Guest[];
  rsvpData: RSVP[];
  handleDataRefresh: () => void;
}

function AdminPartyEditor(props: AdminPartyEditorProps) {
  const { guestData, rsvpData, handleDataRefresh } = props;
  const [accepted, setAccepted] = useState<RSVP[]>([]);
  const [declined, setDeclined] = useState<RSVP[]>([]);
  const [notResponded, setNotResponded] = useState<Guest[]>([]);

  useEffect(() => {
    setAccepted(rsvpData.filter((rsvp) => rsvp.after_party_attending === true));
    setDeclined(rsvpData.filter((rsvp) => rsvp.after_party_attending === false));
    setNotResponded(
      guestData.filter((guest) => {
        // 1. They must be invited to the after-party first
        if (!guest.after_party) return false;

        // 2. Find their RSVP record
        const guestRsvp = rsvpData.find((rsvp) => rsvp.guest_id === guest.guest_id);

        // 3. Include them if:
        //    - They haven't RSVP'd at all OR
        //    - They RSVP'd true to the main event but left after_party_attending as null
        return !guestRsvp || (guestRsvp.attendance === true && guestRsvp.after_party_attending === null);
      }),
    );
  }, [guestData, rsvpData]);

  const handlePartyChange = (attendance: boolean, id: number) => {
    editPartyAttendanceMutation.mutate({ attendance: attendance, rsvpId: id });
  };

  const editPartyAttendanceMutation = useMutation<CustomResponseType, ErrorType, { attendance: any; rsvpId: number }>({
    mutationFn: async ({ attendance, rsvpId }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvps/party/${rsvpId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance: attendance }),
      });

      if (!response.ok) {
        const errorBody: ErrorType = await response.json();
        throw errorBody;
      }

      return response.json() as Promise<CustomResponseType>;
    },
    onSuccess: (data) => {
      handleDataRefresh();
      console.log("Response from server:", data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      console.error("Error updating Guest:", error.message);
    },
  });

  return (
    <div className="admin-rsvp-container">
      <div id="admin-rsvp-viewer-desktop">
        {/* Accepted */}
        <div className="box border-box-100">
          <span className="secondary-text font-sm-med">
            After Party Accepted - {accepted.length}{" "}
            {accepted.length === 1 ? (
              <span className="secondary-text font-sm-med">Guest</span>
            ) : (
              <span className="secondary-text font-sm-med">Guests</span>
            )}
          </span>
          {accepted.length === 0 ? (
            <div style={{ padding: "2rem 0rem" }}>
              <span style={{ color: "var(--secondary-text)" }}>No accepted guests</span>
            </div>
          ) : (
            <div>
              <TableContainer id="admin-rsvp-table-accepted">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Updated At</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accepted &&
                      accepted.map((rsvp) => (
                        <PartyRow
                          rsvp={rsvp}
                          guest={guestData.find((guest) => guest.guest_id === rsvp.guest_id)!}
                          handleDataRefresh={handleDataRefresh}
                          status="accepted"
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
        {/* Declined */}
        <div className="box border-box-100">
          <span className="secondary-text font-sm-med">
            After Party Declined - {declined.length}{" "}
            {declined.length === 1 ? (
              <span className="secondary-text font-sm-med">Guest</span>
            ) : (
              <span className="secondary-text font-sm-med">Guests</span>
            )}
          </span>
          {declined.length === 0 ? (
            <div style={{ padding: "2rem 0rem" }}>
              <span style={{ color: "var(--secondary-text)" }}>No declined guests</span>
            </div>
          ) : (
            <div>
              <TableContainer id="admin-rsvp-table-declined">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Updated At</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {declined &&
                      declined.map((rsvp) => (
                        <PartyRow
                          rsvp={rsvp}
                          guest={guestData.find((guest) => guest.guest_id === rsvp.guest_id)!}
                          handleDataRefresh={handleDataRefresh}
                          status="declined"
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
        {/* Not Responded */}
        <div className="box border-box-100">
          <span className="secondary-text font-sm-med">
            After Party Not Responded - {notResponded.length}{" "}
            {notResponded.length === 1 ? (
              <span className="secondary-text font-sm-med">Guest</span>
            ) : (
              <span className="secondary-text font-sm-med">Guests</span>
            )}
          </span>
          {notResponded.length === 0 ? (
            <div style={{ padding: "2rem 0rem" }}>
              <span style={{ color: "var(--secondary-text)" }}>No not responded guests</span>
            </div>
          ) : (
            <div>
              <TableContainer id="admin-rsvp-table-notresponded">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="underline">Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notResponded &&
                      notResponded.map((guest) => (
                        <PartyRow guest={guest} handleDataRefresh={handleDataRefresh} status="not responded" />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>

      {/* mobile */}
      <div id="admin-rsvp-viewer-mobile">
        <div id="rsvp-viewer-accepted" className="viewer-item">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <p className="faq-title-mobile font-sm-med underline contain-text-center">Accepted - {accepted.length}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex-col-start" style={{ marginTop: "1rem" }}>
                {accepted.length === 0 ? (
                  <div style={{ padding: "2rem 0rem" }}>
                    <span style={{ color: "var(--secondary-text)" }}>No accepted after party guests. </span>
                  </div>
                ) : (
                  <>
                    {accepted.map((rsvp, index) => {
                      let guest = guestData.find((guest) => guest.guest_id === rsvp.guest_id);
                      if (guest) {
                        return (
                          <div className="rsvp-viewer-guest flex-col-start" style={{ gap: "1rem" }} key={index}>
                            <div className="flex-row-start" style={{ gap: "1rem" }}>
                              <p className="font-sm faq-title-mobile">Name:</p>
                              <p className="font-sm underline faq-answer-mobile">{guest.name}</p>
                            </div>
                            <div className="flex-row-start" style={{ gap: "1rem" }}>
                              <p className="font-sm faq-answer-mobile">Updated At:</p>
                              <p className="font-sm faq-answer-mobile">
                                {rsvp.updated_at ? convertUtcToCst(rsvp.updated_at) + "CST" : "N/A"}
                              </p>
                            </div>
                            <div className="btn-container">
                              <div
                                className="rsvp-btn-decline"
                                onClick={() => {
                                  handlePartyChange(false, rsvp.rsvp_id);
                                }}
                              >
                                Change to Declined
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div id="rsvp-viewer-declined" className="viewer-item">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <p className="faq-title-mobile font-sm-med underline contain-text-center">Declined - {declined.length}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex-col-start" style={{ marginTop: "1rem" }}>
                {declined.length === 0 ? (
                  <div style={{ padding: "2rem 0rem" }}>
                    <span style={{ color: "var(--secondary-text)" }}>No declined after party guests. </span>
                  </div>
                ) : (
                  <>
                    {declined.map((rsvp, index) => {
                      let guest = guestData.find((guest) => guest.guest_id === rsvp.guest_id);
                      if (guest) {
                        return (
                          <div
                            className="rsvp-viewer-guest flex-col-start"
                            style={{ gap: "1rem" }}
                            key={`${index}-declined`}
                          >
                            <div className="flex-row-start" style={{ gap: "1rem" }}>
                              <p className="font-sm faq-title-mobile">Name:</p>
                              <p className="font-sm underline faq-answer-mobile">{guest.name}</p>
                            </div>
                            <div className="flex-row-start" style={{ gap: "1rem" }}>
                              <p className="font-sm faq-title-mobile">Updated At:</p>
                              <p className="font-sm faq-answer-mobile">
                                {rsvp.updated_at ? convertUtcToCst(rsvp.updated_at) + "CST" : "N/A"}
                              </p>
                            </div>
                            {!rsvp.attendance ? (
                              <span className="secondary-text strong">Guest declined wedding invite</span>
                            ) : (
                              <div className="btn-container">
                                <button
                                  className="rsvp-btn-accept"
                                  onClick={() => {
                                    handlePartyChange(true, rsvp.rsvp_id);
                                  }}
                                >
                                  Change to Accepted
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div id="admin-not-responded" className="viewer-item">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <p className="font-sm-med faq-title-mobile underline contain-text-center">
                Not Responded - {notResponded.length}
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex-col-start" style={{ marginTop: "1rem" }}>
                {notResponded.map((guest, index) => (
                  <div className="rsvp-viewer-guest flex-col-start" style={{ gap: "1rem" }} key={index}>
                    <div className="flex-row-start" style={{ gap: "1rem" }}>
                      <p className="font-sm faq-answer-mobile">{guest.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default AdminPartyEditor;
