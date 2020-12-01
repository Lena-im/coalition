package business.round;

import java.util.List;

public interface RoundDao {

    public List<Round> findAll();

    public Round findByRoundId(int roundId);
}
