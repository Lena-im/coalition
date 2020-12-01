package business.round;

import business.CoalitionDbException;
import business.JdbcUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RoundDaoJdbc implements RoundDao {

    private static final String FIND_ALL_SQL =
            "SELECT round_id, practice, gamma, delta " +
                    "FROM round";


    private static final String FIND_BY_ROUND_ID_SQL =
            "SELECT round_id, practice, gamma, delta " +
                    "FROM round " +
                    "WHERE round_id = ?";



    @Override
    public List<Round> findAll() {
        List<Round> rounds = new ArrayList<>();
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_ALL_SQL);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Round round = readRound(resultSet);
                rounds.add(round);
            }
        } catch (SQLException e) {
            throw new CoalitionDbException.CoalitionQueryDbException("Encountered a problem finding all rounds", e);
        }
        return rounds;
    }

    @Override
    public Round findByRoundId(int roundId) {
        Round round = null;
        try (Connection connection = JdbcUtils.getConnection();
             PreparedStatement statement = connection.prepareStatement(FIND_BY_ROUND_ID_SQL)) {
            statement.setInt(1, roundId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    round = readRound(resultSet);
                }
            }
        } catch (SQLException e) {
            throw new CoalitionDbException.CoalitionQueryDbException("Encountered a problem finding round " + roundId, e);
        }
        return round;
    }

    private Round readRound(ResultSet resultSet) throws SQLException {
        int roundId = resultSet.getInt("round_id");
        boolean practice = resultSet.getBoolean("practice");
        float gamma = resultSet.getFloat("gamma");
        float delta = resultSet.getFloat("delta");
        return new Round(roundId, practice, gamma, delta);
    }
}
