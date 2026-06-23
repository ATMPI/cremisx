import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";

import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import { matchPath, useLocation } from "react-router";
import DashboardSidebarContext from "../../context/DashboardSidebarContext";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../constants";
import {
  DashboardSidebarPageItem,
  DashboardSidebarDividerItem,
  DashboardSidebarHeaderItem,
} from "./index";

import getDrawerSxTransitionMixin from "../../mixins";

function DashboardSidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
  container,
}) {
  const theme = useTheme();

  const { pathname } = useLocation();

  const [expandedItemIds, setExpandedItemIds] = React.useState([]);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const shouldReduceDrawerMotion =
    theme.motion.reducedMotion === "always" ||
    (theme.motion.reducedMotion === "system" && prefersReducedMotion);
  const drawerEnteringDuration = shouldReduceDrawerMotion
    ? 0
    : theme.transitions.duration.enteringScreen;
  const drawerLeavingDuration = shouldReduceDrawerMotion
    ? 0
    : theme.transitions.duration.leavingScreen;

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  React.useEffect(() => {
    if (expanded) {
      if (drawerEnteringDuration === 0) {
        setIsFullyExpanded(true);
        return undefined;
      }

      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, drawerEnteringDuration);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return undefined;
  }, [drawerEnteringDuration, expanded]);

  React.useEffect(() => {
    if (!expanded) {
      if (drawerLeavingDuration === 0) {
        setIsFullyCollapsed(true);
        return undefined;
      }

      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, drawerLeavingDuration);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);

    return undefined;
  }, [drawerLeavingDuration, expanded]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded]
  );

  const handlePageItemClick = React.useCallback(
    (itemId, hasNestedNavigation) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
                (previousValueItemId) => previousValueItemId !== itemId
              )
            : [...previousValue, itemId]
        );
      } else if (!isOverSmViewport && !hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [mini, setExpanded, isOverSmViewport]
  );

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = React.useCallback(
    (viewport) => (
      <React.Fragment>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={[
            {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "auto",
              scrollbarGutter: mini ? "stable" : "auto",
              overflowX: "hidden",
              pt: !mini ? 0 : 2,
            },
            hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, "padding")
              : null,
          ]}
        >
          <List
            dense
            sx={{
              padding: mini ? 0 : 0.5,
              mb: 4,
              width: mini ? MINI_DRAWER_WIDTH : "auto",
            }}
          >
            <DashboardSidebarHeaderItem>Main items</DashboardSidebarHeaderItem>
            <DashboardSidebarPageItem
              id="employees"
              title="Employees"
              icon={<PersonIcon />}
              href="/employees"
              selected={
                !!matchPath("/employees/*", pathname) || pathname === "/"
              }
            />
            <DashboardSidebarDividerItem />
            <DashboardSidebarHeaderItem>
              Example items
            </DashboardSidebarHeaderItem>
            <DashboardSidebarPageItem
              id="org"
              title="Organizations"
              icon={<ApartmentIcon />}
              href="/org"
              selected={!!matchPath("/org", pathname)}
              defaultExpanded={!!matchPath("/org", pathname)}
              expanded={expandedItemIds.includes("org")}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  <DashboardSidebarPageItem
                    id="orgList"
                    title="List"
                    icon={<FormatListBulletedIcon />}
                    href="/org/list"
                    selected={!!matchPath("/org/list", pathname)}
                  />
                  <DashboardSidebarPageItem
                    id="orgReport"
                    title="Report"
                    icon={<BarChartIcon />}
                    href="/org/report"
                    selected={!!matchPath("/org/report", pathname)}
                  />
                </List>
              }
            />
            <DashboardSidebarPageItem
              id="equipment"
              title="Equipment"
              icon={<PrecisionManufacturingIcon />}
              href="/equipment"
              selected={!!matchPath("/equipment", pathname)}
              defaultExpanded={!!matchPath("/equipment", pathname)}
              expanded={expandedItemIds.includes("equipment")}
              nestedNavigation={
                <List
                  dense
                  sx={{
                    padding: 0,
                    my: 1,
                    pl: mini ? 0 : 1,
                    minWidth: 240,
                  }}
                >
                  <DashboardSidebarPageItem
                    id="equipmentList"
                    title="List"
                    icon={<FormatListBulletedIcon />}
                    href="/equipment/list"
                    selected={!!matchPath("/equipment/list", pathname)}
                  />
                  <DashboardSidebarPageItem
                    id="equipmentType"
                    title="Type"
                    icon={<CategoryIcon />}
                    href="/equipment/type"
                    selected={!!matchPath("/equipment/type", pathname)}
                  />
                </List>
              }
            />

            {/* <DashboardSidebarPageItem
              id="integrations"
              title="Integrations"
              icon={<LayersIcon />}
              href="/integrations"
              selected={!!matchPath("/integrations", pathname)}
            /> */}
          </List>
        </Box>
      </React.Fragment>
    ),
    [mini, hasDrawerTransitions, isFullyExpanded, expandedItemIds, pathname]
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary) => (drawerTheme) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;
      const widthTransitionStyles = getDrawerSxTransitionMixin(
        expanded,
        "width"
      )(drawerTheme);

      return {
        displayPrint: "none",
        width: drawerWidth,
        flexShrink: 0,
        ...widthTransitionStyles,
        overflowX: "hidden",
        ...(isTemporary ? { position: "absolute" } : {}),
        [`& .MuiDrawer-paper`]: {
          position: "absolute",
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundImage: "none",
          ...widthTransitionStyles,
          overflowX: "hidden",
        },
      };
    },
    [expanded, mini]
  );

  const sidebarContextValue = React.useMemo(() => {
    return {
      onPageItemClick: handlePageItemClick,
      mini,
      fullyExpanded: isFullyExpanded,
      fullyCollapsed: isFullyCollapsed,
      hasDrawerTransitions,
    };
  }, [
    handlePageItemClick,
    mini,
    isFullyExpanded,
    isFullyCollapsed,
    hasDrawerTransitions,
  ]);

  return (
    <DashboardSidebarContext.Provider value={sidebarContextValue}>
      <Drawer
        container={container}
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={[
          {
            display: {
              xs: "block",
              sm: disableCollapsibleSidebar ? "block" : "none",
              md: "none",
            },
          },
          getDrawerSharedSx(true),
        ]}
      >
        {getDrawerContent("phone")}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={[
          {
            display: {
              xs: "none",
              sm: disableCollapsibleSidebar ? "none" : "block",
              md: "none",
            },
          },
          getDrawerSharedSx(false),
        ]}
      >
        {getDrawerContent("tablet")}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={[
          { display: { xs: "none", md: "block" } },
          getDrawerSharedSx(false),
        ]}
      >
        {getDrawerContent("desktop")}
      </Drawer>
    </DashboardSidebarContext.Provider>
  );
}

DashboardSidebar.propTypes = {
  container: (props, propName) => {
    if (props[propName] == null) {
      return null;
    }
    if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  },
  disableCollapsibleSidebar: PropTypes.bool,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func.isRequired,
};

export default DashboardSidebar;
