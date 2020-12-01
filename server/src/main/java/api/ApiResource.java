package api;

import business.ApplicationContext;
import business.firm.Firm;
import business.firm.FirmDao;
import business.round.Round;
import business.round.RoundDao;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.List;

@ApplicationPath("/")
@Path("/")
public class ApiResource {

    private final RoundDao roundDao = ApplicationContext.INSTANCE.getRoundDao();
    private final FirmDao firmDao = ApplicationContext.INSTANCE.getFirmDao();

    @GET
    @Path("rounds")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Round> round(@Context HttpServletRequest httpRequest) {
        try {
            return roundDao.findAll();
        } catch (Exception e) {
            throw new ApiException("rounds lookup failed", e);
        }
    }

    @GET
    @Path("rounds/{round-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Round roundById(@PathParam("round-id") int roundId,
                             @Context HttpServletRequest httpRequest) {
        try {
            Round result = roundDao.findByRoundId(roundId);
            if (result == null) {
                throw new ApiException(String.format("No such round id: %d", roundId));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Category lookup by round-id %d failed", roundId), e);
        }
    }

    @GET
    @Path("firms/{firm-id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Firm firmById(@PathParam("firm-id") int firmId,
                          @Context HttpServletRequest httpRequest) {
        try {
            Firm result = firmDao.findByFirmId(firmId);
            if (result == null) {
                throw new ApiException(String.format("No such firm id: %d", firmId));
            }
            return result;
        } catch (Exception e) {
            throw new ApiException(String.format("Firm lookup by firm-id %d failed", firmId), e);
        }
    }

    @GET
    @Path("round/{round-id}/firms")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Firm> firmsByRoundId(@PathParam("round-id") int roundId,
                                         @Context HttpServletRequest httpRequest) {
        try {
            Round round = roundDao.findByRoundId(roundId);
            if (round == null) {
                throw new ApiException(String.format("No such round id: %d", roundId));
            }
            return firmDao.findByRoundId(roundId);
        } catch (Exception e) {
            throw new ApiException(String.format("Firm list lookup by round-id %d failed", roundId), e);
        }
    }
}
