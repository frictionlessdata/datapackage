import os
import io
import subprocess
import inifile
import jinja2


ROOT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)))
TEMPLATES = os.path.join(ROOT_DIR, 'templates')
DATABAGS = os.path.join(ROOT_DIR, 'databags')
RFCS = os.path.join(ROOT_DIR, 'assets', 'rfc')


def get_env(tmpl_dir='./'):
    """Get a Jinja environment instance."""
    loader = jinja2.FileSystemLoader(tmpl_dir)
    env = jinja2.Environment(loader=loader)
    return env


def get_spec_keys():
    """Get keys for each specification."""
    source = os.path.join(DATABAGS, 'specifications.ini')
    specs = inifile.IniFile(source)
    return specs.keys()


def get_context(key):
    """build the context for a specification, represented by key."""
    return context.get(key, {})


def render_xmls(source='rfc.xml'):
    """Create template strings of RFC-compatible XML, keyed by specification."""
    env = get_env(TEMPLATES)
    template = env.get_template(source)
    renders = {}
    for key in get_spec_keys():
        context = get_context(key)
        result = template.render(context)
        renders[key] = result
    return renders


def write_xmls(renders):
    """Create XML source files for each specification, consumable by xml2rfc."""
    paths = []
    for key, template in renders.items():
        dest = os.path.join(RFCS, '{0}.xml'.format(key))
        paths.append(dest)
        with io.open(dest, 'w+') as stream:
            stream.write(template)
    return paths


def write_rfcs(xmls):
    """Run xml2rfc against each XML source."""
    for xml in xmls:
        subprocess.call(['xml2rfc', xml])


def make_rfcs():
    """Run the pipeline to make RFCs for Frictionless Data specifications."""
    return write_rfcs(write_xmls(render_xmls()))


if __name__ == '__main__':
    print(make_rfcs())
