import React, { useEffect } from "react";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // componentDidMount() {
  //   const { fetchCollectionsStart } = this.props;

  //   fetchCollectionsStart();
  // }

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
