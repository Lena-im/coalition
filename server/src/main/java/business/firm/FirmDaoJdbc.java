package business.firm;

import business.CoalitionDbException;
import business.JdbcUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FirmDaoJdbc implements FirmDao {

    private static final String FIND_BY_FIRM_ID_SQL =
            "SELECT firm_id, name, is_upstream, quantity, tech, cost, market, coalition, round_id, type " +
                    "FROM firm " +
                    "WHERE firm_id = ?";

    private static final String FIND_BY_ROUND_ID_SQL =
            "SELECT firm_id, name, is_upstream, quantity, tech, cost, market, coalition, round_id, type " +
                    "FROM firm " +
                    "WHERE round_id = ?";

    @Override
    public List<Firm> findByRoundId(int roundId) {
        List<Firm> firms = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_ROUND_ID_SQL)){
            statement.setInt(1, roundId);
            try(ResultSet resultSet = statement.executeQuery()){
                while (resultSet.next()) {
                    Firm firm = readFirm(resultSet);
                    firms.add(firm);
                }
            }
        } catch (SQLException e) {
            throw new CoalitionDbException.CoalitionQueryDbException("Encountered a problem finding firm with round id" + roundId, e);
        }
        return firms;
    }

    @Override
    public Firm findByFirmId(int firmId) {
        Firm firm = null;
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_FIRM_ID_SQL)) {
            statement.setInt(1, firmId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    firm = readFirm(resultSet);
                }
            }
        } catch (SQLException e) {
            throw new CoalitionDbException.CoalitionQueryDbException("Encountered a problem finding firm " + firmId, e);
        }
        return firm;
    }

    private Firm readFirm(ResultSet resultSet) throws SQLException {
        int firmId = resultSet.getInt("firm_id");
        String name = resultSet.getString("name");
        boolean isUpstream = resultSet.getBoolean("is_upstream");
        int quantity = resultSet.getInt("quantity");
        int tech = resultSet.getInt("tech");
        int cost = resultSet.getInt("cost");
        int market = resultSet.getInt("market");
        int roundId = resultSet.getInt("round_Id");
        String coalition = resultSet.getString("coalition");
        String type = resultSet.getString("type");
        return new Firm(firmId, name, isUpstream, quantity, tech, cost, market, coalition, roundId,type );
    }

}
