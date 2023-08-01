/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Axios } from "Config/Axios/Axios";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import { CircularProgress } from "@mui/material";

function Dashboard() {

  const { sales, tasks } = reportsLineChartData;

  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    Axios.get("/api/v1/app/dashboard/getFeeds")
      .then((res) => {
        console.log(res);
        setFeeds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  color="dark"
                  icon="report_gmail_icon"
                  title="Today's Crimes"
                  count={feeds?.todaysCrimes}
                  percentage={{
                    color: "success",
                    amount: `${feeds?.todaysCrimesIncrease?.toFixed(2)}%`,
                    label: "than yesterday",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Total Crimes"
                  count={feeds?.totalCrimes}
                  percentage={{
                    color: "success",
                    amount: `${feeds?.crimesThisMonth}`,
                    label: "cimes this month",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  color="error"
                  icon="priority_high"
                  title="Total Criminals"
                  count={feeds?.totalCriminals}
                  percentage={{
                    color: "success",
                    amount: `${feeds?.criminalsThisMonth}`,
                    label: "criminals this month",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {feeds ? (
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Open Cases"
                  count={feeds?.unClosedCases}
                  percentage={{
                    color: "success",
                    amount: feeds?.inProgressCases,
                    label: "in progress cases",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" height={100} />
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {feeds ? (
                <ReportsBarChart
                  color="info"
                  title="Crimes"
                  description="This month"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              ) : (
                <Skeleton variant="rectangular" height={200} />
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {feeds ? (
                <ReportsLineChart
                  color="success"
                  title="daily stats"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today cases.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              ) : (
                <Skeleton variant="rectangular" height={200} borderRadius={40}/>
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              {feeds ? (
                <ReportsLineChart
                  color="dark"
                  title="Open cases"
                  description="This month"
                  date="just updated"
                  chart={tasks}
                />
              ) : (
                <Skeleton variant="rectangular" height={200} borderRadius={40}/>
              )}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            {feeds ? (
              <OrdersOverview />
            ) : (
              <Skeleton variant="rectangular" height={400}  borderRadius={40}/>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
