// Dashboard.js
import React, { useEffect } from "react";
import NetWorth from "../../Components/NetWorth/NetWorth";
import Portfolio from "../../Components/Portfolio/Portfolio";
import axios from "axios";
import * as cheerio from 'cheerio';

function Dashboard() {
 
  return (
    <>
      <NetWorth />
      <Portfolio />
    </>
  );
}

export default Dashboard;
