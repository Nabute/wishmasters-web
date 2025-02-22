import type { AsyncDataOptions } from "#app";
import type { Competition, CompetitionListResponse } from "../types";
import BaseModule from "../factory";

export default class CompetitionModule extends BaseModule<
    CompetitionListResponse,
    Competition
> {
    protected RESOURCE = "games/competitions";

    async getAll(
        queryParams: object,
        asyncDataOptions: AsyncDataOptions<CompetitionListResponse>
    ): Promise<CompetitionListResponse> {
        return this.fetchData(queryParams, asyncDataOptions);
    }

    async join(competitionId: string, entry_fee: number, asyncDataOptions: AsyncDataOptions<Competition>): Promise<Competition> {
        const extension = `/${competitionId}/join`
        return this.createEntity({entry_fee}, extension, asyncDataOptions);
    }

    async submitScore(competitionId: string, score: number, asyncDataOptions: AsyncDataOptions<Competition>): Promise<Competition> {
        const extension = `/${competitionId}/submit_score`
        return this.createEntity({score}, extension, asyncDataOptions);
    }

    async getLeaders(
        competitionId: string,
        asyncDataOptions: AsyncDataOptions<CompetitionListResponse>
    ): Promise<CompetitionListResponse> {
        const extension = `/${competitionId}/leaderboard`
        return this.fetchData({}, asyncDataOptions, extension);
    }
}
