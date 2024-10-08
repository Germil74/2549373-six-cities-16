import { createSelector } from '@reduxjs/toolkit';
import { getComments } from '../comments/comments';
import { State } from '../../../types/state';
import { Nullable } from '../../../types/globals';
import { FullOffer, Offers } from '../../../types/offers';

export const getOffer = (state: State): Nullable<FullOffer> => state.offer.offer;
export const getNearby = (state: State): Nullable<Offers> => state.offer.nearby;

export const getOfferRequestStatus = (state: State) => state.offer.requestStatus;
export const getOfferErrorMessage = (state: State) => state.offer.errorMessage;
export const getDataOffer = createSelector(
  [getOffer, getComments, getOfferRequestStatus, getOfferErrorMessage],
  (offer, comments, requestStatus, errorMessage) => ({
    offer,
    comments,
    requestStatus,
    errorMessage,
  })
);

export const getNearbyPlacesData = createSelector(
  [getNearby, getOffer],
  (nearbyOffers, currentOffer) => {
    if (!nearbyOffers || !currentOffer) {
      return [];
    }
    return nearbyOffers.filter((nearbyOffer) => nearbyOffer.id !== currentOffer.id).slice(0, 3);
  }
);
