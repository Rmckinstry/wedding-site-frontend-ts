import React, { useEffect, useState } from "react";
import { Guest, RSVP } from "../../utility/types";
import { convertUtcToCst } from "../../utility/util.ts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import GuestRow from "./GuestRow.tsx";
import RSVPRow from "./RSVPRow.tsx";

function AdminRSVPViewer({
  guestData,
  rsvpData,
  handleDataRefresh,
}: {
  guestData: Guest[];
  rsvpData: RSVP[];
  handleDataRefresh: () => void;
}) {
  const separator = "\u00A7";
  const [accepted, setAccepted] = useState<RSVP[]>([]);
  const [declined, setDeclined] = useState<RSVP[]>([]);
  const [notResponded, setNotResponded] = useState<Guest[]>([]);

  useEffect(() => {
    setAccepted(rsvpData.filter((rsvp) => rsvp.attendance === true));
    setDeclined(rsvpData.filter((rsvp) => rsvp.attendance === false));
    setNotResponded(guestData.filter((guest) => !rsvpData.find((rsvp) => rsvp.guest_id === guest.guest_id)));
  }, [guestData, rsvpData]);

  return (
    <div id="admin-rsvp-viewer">
      {/* Accepted */}
      <div className="box border-box-100">
        <span className="secondary-text font-sm-med">
          Accepted - {accepted.length}{" "}
          {accepted.length === 1 ? (
            <span className="secondary-text font-sm-med">Guest</span>
          ) : (
            <span className="secondary-text font-sm-med">Guests</span>
          )}
        </span>
        {accepted.length === 0 ? (
          <div style={{ padding: "2rem 0rem" }}>
            <span>No accepted guests</span>
          </div>
        ) : (
          <div>
            <TableContainer id="admin-rsvp-table-accepted">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Songs Requested</TableCell>
                    <TableCell align="right">Diet Restrictions</TableCell>
                    <TableCell align="right">Updated At</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {accepted &&
                    accepted.map((rsvp) => (
                      <RSVPRow
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
          Declined - {declined.length}{" "}
          {declined.length === 1 ? (
            <span className="secondary-text font-sm-med">Guest</span>
          ) : (
            <span className="secondary-text font-sm-med">Guests</span>
          )}
        </span>
        {declined.length === 0 ? (
          <div style={{ padding: "2rem 0rem" }}>
            <span>No declined guests</span>
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
                      <RSVPRow
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
          Not Responded - {notResponded.length}{" "}
          {notResponded.length === 1 ? (
            <span className="secondary-text font-sm-med">Guest</span>
          ) : (
            <span className="secondary-text font-sm-med">Guests</span>
          )}
        </span>
        {notResponded.length === 0 ? (
          <div style={{ padding: "2rem 0rem" }}>
            <span>No not responded guests</span>
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
                      <RSVPRow guest={guest} handleDataRefresh={handleDataRefresh} status="not responded" />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>

      <div id="rsvp-viewer-container" className="flex-row">
        <div id="rsvp-viewer-accepted" className="viewer-item">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <p className="font-sm-med strong-text underline contain-text-center">Accepted</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex-col-start" style={{ marginTop: "1rem" }}>
                {rsvpData
                  .filter((rsvp) => rsvp.attendance === true)
                  .map((rsvp, index) => {
                    let guest = guestData.find((guest) => guest.guest_id === rsvp.guest_id);
                    if (guest) {
                      return (
                        <div className="rsvp-viewer-guest flex-col-start" style={{ gap: "1rem" }} key={index}>
                          <div className="flex-row-start" style={{ gap: "1rem" }}>
                            <p className="font-sm strong-text">Name:</p>
                            <p className="font-sm underline">{guest.name}</p>
                          </div>
                          {guest.additional_guest_type !== null && (
                            <div>
                              <div className="flex-row-start" style={{ gap: "1rem" }}>
                                <p className="font-sm strong-text">Guest Type:</p>
                                <p className="font-sm">{guest.additional_guest_type}</p>
                              </div>
                              <div className="flex-row-start" style={{ gap: "1rem" }}>
                                <p className="font-sm strong-text">Added By:</p>
                                <p className="font-sm">
                                  {guestData.find((main) => main.guest_id === guest.added_by_guest_id)?.name}
                                </p>
                              </div>
                            </div>
                          )}
                          {rsvp.spotify !== "" && (
                            <div>
                              <p className="font-sm strong-text">Spotify</p>
                              {rsvp.spotify.split(separator).map((song) => (
                                <p className="font-sm ">- {song}</p>
                              ))}
                            </div>
                          )}
                          <div className="flex-row-start" style={{ gap: "1rem" }}>
                            <p className="font-sm strong-text">Created At:</p>
                            <p className="font-sm">{convertUtcToCst(rsvp.created_at) + "CST"}</p>
                          </div>
                          <div className="flex-row-start" style={{ gap: "1rem" }}>
                            <p className="font-sm strong-text">Updated At:</p>
                            <p className="font-sm">
                              {rsvp.updated_at ? convertUtcToCst(rsvp.updated_at) + "CST" : "N/A"}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div id="rsvp-viewer-declined" className="viewer-item">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <p className="font-sm-med strong-text underline contain-text-center">Declined</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex-col-start" style={{ marginTop: "1rem" }}>
                {rsvpData
                  .filter((rsvp) => rsvp.attendance === false)
                  .map((rsvp, index) => {
                    let guest = guestData.find((guest) => guest.guest_id === rsvp.guest_id);
                    if (guest) {
                      return (
                        <div
                          className="rsvp-viewer-guest flex-col-start"
                          style={{ gap: "1rem" }}
                          key={`${index}-declined`}
                        >
                          <div className="flex-row-start" style={{ gap: "1rem" }}>
                            <p className="font-sm strong-text">Name:</p>
                            <p className="font-sm underline">{guest.name}</p>
                          </div>
                          <div className="flex-row-start" style={{ gap: "1rem" }}>
                            <p className="font-sm strong-text">Created At:</p>
                            <p className="font-sm">{convertUtcToCst(rsvp.created_at) + "CST"}</p>
                          </div>
                          <div className="flex-row-start" style={{ gap: "1rem" }}>
                            <p className="font-sm strong-text">Updated At:</p>
                            <p className="font-sm">
                              {rsvp.updated_at ? convertUtcToCst(rsvp.updated_at) + "CST" : "N/A"}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div id="admin-not-responded" className="flex-row">
        <div className="viewer-item">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <p className="font-sm-med strong-text underline contain-text-center">Not Responded</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex-col-start" style={{ marginTop: "1rem" }}>
                {guestData
                  .filter((guest) => !rsvpData.find((rsvp) => rsvp.guest_id === guest.guest_id))
                  .map((guest, index) => (
                    <div className="rsvp-viewer-guest flex-col-start" style={{ gap: "1rem" }} key={index}>
                      <div className="flex-row-start" style={{ gap: "1rem" }}>
                        <p className="font-sm strong-text">Name:</p>
                        <p className="font-sm underline">{guest.name}</p>
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

export default AdminRSVPViewer;
