package business.firm;

import java.util.List;

public interface FirmDao {

    public Firm findByFirmId(int firmId);

    public List<Firm> findByRoundId(int roundId);
}
