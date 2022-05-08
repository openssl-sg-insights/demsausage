
from datetime import timedelta

from demsausage.app.models import Elections
from demsausage.rq.jobs import task_regenerate_cached_election_data
from demsausage.util import make_logger
from django.core.cache import cache
from django.utils import timezone

logger = make_logger(__name__)


def clear_elections_cache():
    cache.delete(get_elections_cache_key())


def get_polling_place_geojson_cache_key(electionId):
    return "election_{}_polling_places_geojson".format(electionId)


def get_polling_place_json_cache_key(electionId):
    return "election_{}_polling_places_json".format(electionId)


def get_election_map_png_cache_key(electionId):
    return f"election_/api/0.1/map_image/{electionId}/_map_export_png"


def get_default_election_map_png_cache_key():
    return "election_/api/0.1/map_image/_map_export_png"


def get_elections_cache_key():
    return "elections_list"


def cache_rehydration_on_init_tasks():
    # Rehydrate the cache for all active elections (starting with the primary election)
    for election in Elections.objects.filter(is_hidden=False, election_day__gte=timezone.now() - timedelta(days=1)).order_by("-is_primary").values("id"):
        task_regenerate_cached_election_data.delay(election_id=election['id'])


def getDefaultElection():
    return Elections.objects.filter(is_primary=True).get()
